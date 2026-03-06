import React, { useState, useEffect } from 'react'
import '../styles/landing_navbar.css'

export default function Landingnavbar({ onAuthOpen }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="title">Smart Placement</div>

            <div className="nav-actions">
                <button className="btn ghost" onClick={() => onAuthOpen('login')}>Login</button>
                <button className="btn primary" onClick={() => onAuthOpen('signup')}>Sign up</button>
            </div>
        </div>
    )
}