import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/OnboardingModal.css';

export default function OnboardingModal({ user, onComplete }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        dreamCompany: '',
        targetRole: 'Software Engineer',
        codingLevel: 'Beginner',
        graduationYear: '2026',
        focusArea: 'DSA',
        weeklyStudyTime: '5–10 hours'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await setDoc(doc(db, "users", user.uid), {
                ...formData,
                roadmapGenerated: true,
                onboardingCompletedAt: new Date()
            }, { merge: true });

            onComplete(); // Hide modal
            navigate('/dashboard/roadmap'); // Redirect to roadmap after successful submission
        } catch (error) {
            console.error("Error saving onboarding data:", error);
            alert("Failed to save data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="onboarding-overlay">
            <div className="onboarding-modal glass-panel">
                <div className="onboarding-header">
                    <h2>🚀 Welcome! Let's Build Your Placement Roadmap</h2>
                    <p>Tell us about your career goals so we can create a personalized placement preparation roadmap for you.</p>
                </div>

                <form onSubmit={handleSubmit} className="onboarding-form">
                    <div className="input-group">
                        <label>Dream Company</label>
                        <input
                            type="text"
                            name="dreamCompany"
                            value={formData.dreamCompany}
                            onChange={handleChange}
                            placeholder="e.g. Google, Amazon, Microsoft"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Target Role</label>
                            <select name="targetRole" value={formData.targetRole} onChange={handleChange} required>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Web Developer">Web Developer</option>
                                <option value="Data Scientist">Data Scientist</option>
                                <option value="Data Analyst">Data Analyst</option>
                                <option value="AI/ML Engineer">AI/ML Engineer</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Current Coding Level</label>
                            <select name="codingLevel" value={formData.codingLevel} onChange={handleChange} required>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label>Graduation Year</label>
                            <select name="graduationYear" value={formData.graduationYear} onChange={handleChange} required>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label>Weekly Study Time</label>
                            <select name="weeklyStudyTime" value={formData.weeklyStudyTime} onChange={handleChange} required>
                                <option value="5–10 hours">5–10 hours</option>
                                <option value="10–20 hours">10–20 hours</option>
                                <option value="20+ hours">20+ hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Primary Preparation Focus</label>
                        <select name="focusArea" value={formData.focusArea} onChange={handleChange} required>
                            <option value="DSA">DSA</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI / Machine Learning">AI / Machine Learning</option>
                            <option value="Core Computer Science Subjects">Core Computer Science Subjects</option>
                            <option value="Full Stack Development">Full Stack Development</option>
                        </select>
                    </div>

                    <button type="submit" className="onboarding-submit-btn" disabled={loading}>
                        {loading ? 'Generating Roadmap...' : 'Generate My Roadmap'}
                    </button>
                </form>
            </div>
        </div>
    );
}
