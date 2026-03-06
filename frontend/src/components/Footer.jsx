import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2>Smart Placement</h2>
                    <p>Empowering students with AI-driven career guidance and interview prep.</p>
                </div>

                <div className="footer-links">
                    <div className="link-group">
                        <h4>Platform</h4>
                        <Link to="/">About</Link>
                        <Link to="/">Contact</Link>
                    </div>

                    <div className="link-group">
                        <h4>Socials</h4>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>

                    <div className="link-group">
                        <h4>Legal</h4>
                        <Link to="/">Privacy Policy</Link>
                        <Link to="/">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Smart Placement AI. All rights reserved.</p>
            </div>
        </footer>
    );
}
