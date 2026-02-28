import React from 'react';
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
                        <a href="#">Dashboard</a>
                        <a href="#">Opportunities</a>
                        <a href="#">Insights</a>
                    </div>

                    <div className="link-group">
                        <h4>Resources</h4>
                        <a href="#">Mock Interviews</a>
                        <a href="#">Resume Builder</a>
                        <a href="#">Help Center</a>
                    </div>

                    <div className="link-group">
                        <h4>Legal</h4>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Smart Placement AI. All rights reserved.</p>
            </div>
        </footer>
    );
}
