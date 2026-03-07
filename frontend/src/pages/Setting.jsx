import React, { useState } from 'react';
import '../styles/setting.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { signOut, deleteUser, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function Setting() {
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordSuccess, setPasswordSuccess] = useState('');

    const [notifications, setNotifications] = useState({
        emailNotifications: false
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') !== 'light';
    });

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prev => ({ ...prev, [name]: value }));
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("New passwords do not match!");
            return;
        }

        const user = auth.currentUser;
        if (user) {
            try {
                // Determine if user is using Google Auth or Email Auth.
                // If Google, they might not have a classic password. But trying EmailAuth credential works for Email/Password users.
                const credential = EmailAuthProvider.credential(user.email, passwordData.oldPassword);
                await reauthenticateWithCredential(user, credential);

                await updatePassword(user, passwordData.newPassword);

                setPasswordSuccess('Password updated successfully!');
                setTimeout(() => setPasswordSuccess(''), 3000);
                setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            } catch (error) {
                console.error("Error updating password:", error);
                if (error.code === 'auth/invalid-credential') {
                    alert('Incorrect old password.');
                } else if (error.code === 'auth/weak-password') {
                    alert('New password is too weak. Please use at least 6 characters.');
                } else {
                    alert("Failed to update password: " + error.message);
                }
            }
        }
    };

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        const newTheme = newMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // App.jsx routing will automatically redirect to LandingPage
        } catch (error) {
            console.error("Error signing out: ", error);
            alert("Failed to log out. Please try again.");
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost."
        );

        if (confirmDelete && auth.currentUser) {
            try {
                await deleteUser(auth.currentUser);
                // App.jsx will automatically handle redirecting on auth state change
            } catch (error) {
                console.error("Error deleting account: ", error);
                if (error.code === 'auth/requires-recent-login') {
                    alert("For security reasons, please log out and log back in before deleting your account.");
                } else {
                    alert("Failed to delete account. Please try again later.");
                }
            }
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Manage your account and preferences</p>
            </div>

            {/* Section 1: Account Security */}
            <div className="settings-section">
                <div className="section-title">
                    <LockOutlinedIcon className="section-icon" />
                    Account Security
                </div>
                <form className="settings-form" onSubmit={handlePasswordSubmit}>
                    <div className="form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter current password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button type="submit" className="update-btn">Update Password</button>
                    {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}
                </form>
            </div>

            {/* Section 2: Notifications */}
            <div className="settings-section">
                <div className="section-title">
                    <NotificationsNoneIcon className="section-icon" />
                    Notifications
                </div>
                <div className="toggle-list">


                    <div className="toggle-item">
                        <div className="toggle-info">
                            <h4>Email Notifications</h4>
                            <p>Receive weekly summary emails and announcements</p>
                        </div>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={notifications.emailNotifications}
                                onChange={() => toggleNotification('emailNotifications')}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Section 3: Appearance */}
            <div className="settings-section">
                <div className="section-title">
                    <PaletteOutlinedIcon className="section-icon" />
                    Appearance
                </div>
                <div className="toggle-item">
                    <div className="toggle-info">
                        <h4>Dark Mode</h4>
                        <p>Toggle between light and dark themes</p>
                    </div>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            {/* Section 4: Account Control */}
            <div className="settings-section">
                <div className="section-title">
                    <ExitToAppIcon className="section-icon" />
                    Account Control
                </div>
                <div className="account-actions">
                    <button className="logout-btn" onClick={handleLogout}>
                        <ExitToAppIcon /> Logout
                    </button>
                    <button className="delete-btn" onClick={handleDeleteAccount}>
                        <DeleteOutlineIcon /> Delete Account
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Setting;
