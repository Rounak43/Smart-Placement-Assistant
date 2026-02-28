import React from 'react'
import '../styles/landing_navbar.css'

export default function Landingnavbar({ onAuthOpen }) {
    return (
        <div className="navbar">
            <div className="title">Smart Placement</div>

            <div className="nav-actions">
                <button className="btn ghost" onClick={() => onAuthOpen('login')}>Login</button>
                <button className="btn primary" onClick={() => onAuthOpen('signup')}>Sign up</button>
            </div>
        </div>
    )
}