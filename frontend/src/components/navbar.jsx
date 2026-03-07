import React, { useState, useEffect } from 'react'
import '../styles/navbar.css'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import DescriptionIcon from '@mui/icons-material/Description'
import AssessmentIcon from '@mui/icons-material/Assessment'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import { signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase/firebase'
import { Link } from 'react-router-dom'

export default function Navbar({ user }) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)
    const [currentDateTime, setCurrentDateTime] = useState('')
    const [dbName, setDbName] = useState('')

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("Navbar: Triggered fetchUserData. User UID:", user?.uid);
            if (user?.uid) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("Navbar: Firestore data retrieved:", data);
                        if (data.name) {
                            console.log("Navbar: Found name:", data.name);
                            setDbName(data.name);
                        } else {
                            console.log("Navbar: User document exists, but no 'name' field.");
                        }
                    } else {
                        console.log("Navbar: No user document found in Firestore.");
                    }
                } catch (error) {
                    console.error("Navbar: Error fetching user data for navbar:", error);
                }
            } else {
                console.log("Navbar: No user uid available from props.");
            }
        };
        fetchUserData();

        const updateDateTime = () => {
            const now = new Date();
            const options = {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            setCurrentDateTime(now.toLocaleString(undefined, options));
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 60000); // update every minute

        const handler = () => {
            setDrawerOpen(false)
            setAccountOpen(false)
        }
        window.addEventListener('click', handler)
        return () => {
            window.removeEventListener('click', handler)
            clearInterval(interval)
        }
    }, [])

    const toggleDrawer = (e) => { e.stopPropagation(); setDrawerOpen(v => !v) }
    const toggleAccount = (e) => { e.stopPropagation(); setAccountOpen(v => !v) }

    const handleSignOut = async (e) => {
        e.stopPropagation()
        try {
            await signOut(auth)
        } catch (err) {
            console.error('Sign out error', err)
        }
        setAccountOpen(false)
    }

    return (
        <>
            <div className="navbar" onClick={(e) => e.stopPropagation()}>
                <div className="menu-icon" onClick={toggleDrawer} aria-label="open menu">
                    <MenuIcon fontSize="inherit" />
                </div>

                <div className="title">Smart Placement</div>

                <div className="nav-right">
                    <span className="nav-date-time">{currentDateTime}</span>
                    <div className={accountOpen ? 'account open' : 'account'} onClick={toggleAccount}>
                        <div className="nav-avatar">
                            {dbName ? dbName.charAt(0).toUpperCase() : (user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U')}
                        </div>

                        <div className="dropdown">
                            <div className="profile">
                                <AccountCircleIcon className="nav-profile-icon" />
                                <div>
                                    <h4>{dbName || user?.displayName || 'User'}</h4>
                                    <p>{user?.email || 'no-reply@example.com'}</p>
                                </div>
                            </div>
                            <button onClick={handleSignOut}>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={drawerOpen ? 'side-drawer open' : 'side-drawer'} onClick={(e) => e.stopPropagation()}>
                <div className="side-drawer-header">
                    Menu
                </div>
                <ul>
                    <li>
                        <Link to="/dashboard" className="nav-link-item" onClick={() => setDrawerOpen(false)}>
                            <HomeIcon className="menu-item-icon" /> <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <div className="nav-link-item" onClick={() => setDrawerOpen(false)}>
                            <AssessmentIcon className="menu-item-icon" /> <span>Analysis/Performance</span>
                        </div>
                    </li>
                    <li>
                        <Link to="/dashboard/profile" className="nav-link-item" onClick={() => setDrawerOpen(false)}>
                            <PersonIcon className="menu-item-icon" /> <span>Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/setting" className="nav-link-item" onClick={() => setDrawerOpen(false)}>
                            <SettingsIcon className="menu-item-icon" /> <span>Setting</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={drawerOpen ? 'overlay open' : 'overlay'} onClick={(e) => { e.stopPropagation(); setDrawerOpen(false) }} />
        </>
    )
}