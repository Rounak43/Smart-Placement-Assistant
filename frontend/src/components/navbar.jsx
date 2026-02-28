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
import { auth } from '../firebase/firebase'

export default function Navbar({ user }) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [accountOpen, setAccountOpen] = useState(false)

    useEffect(() => {
        const handler = () => {
            setDrawerOpen(false)
            setAccountOpen(false)
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
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

                <div className={accountOpen ? 'account open' : 'account'} onClick={toggleAccount}>
                    <AccountCircleIcon fontSize="inherit" />

                    <div className="dropdown">
                        <div className="profile">
                            <AccountCircleIcon style={{ fontSize: 40 }} />
                            <div>
                                <h4>{user?.displayName || 'User'}</h4>
                                <p>{user?.email || 'no-reply@example.com'}</p>
                            </div>
                        </div>
                        <button onClick={handleSignOut}>Sign out</button>
                    </div>
                </div>
            </div>

            <div className={drawerOpen ? 'side-drawer open' : 'side-drawer'} onClick={(e) => e.stopPropagation()}>
                <div className="side-drawer-header">
                    Menu
                </div>
                <ul>
                    <li><HomeIcon className="menu-item-icon" /> <span>Home</span></li>
                    <li><WorkIcon className="menu-item-icon" /> <span>Job / Opportunities</span></li>
                    <li><DescriptionIcon className="menu-item-icon" /> <span>Applications</span></li>
                    <li><AssessmentIcon className="menu-item-icon" /> <span>Analysis/Performance</span></li>
                    <li><PersonIcon className="menu-item-icon" /> <span>Profile</span></li>
                    <li><SettingsIcon className="menu-item-icon" /> <span>Setting</span></li>
                </ul>
            </div>

            <div className={drawerOpen ? 'overlay open' : 'overlay'} onClick={(e) => { e.stopPropagation(); setDrawerOpen(false) }} />
        </>
    )
}