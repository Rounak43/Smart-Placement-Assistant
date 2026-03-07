import React, { useState, useEffect } from 'react';
import '../styles/PlacementReadiness.css';

// Icons
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ConstructionIcon from '@mui/icons-material/Construction';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

export default function PlacementReadiness({ user }) {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);

    // Mock AI Generation Function
    const generateReport = () => {
        setLoading(true);
        // Simulate AI analysis delay
        setTimeout(() => {
            const mockData = {
                overallScore: 78,
                breakdown: {
                    coding: 82,
                    aptitude: 75,
                    technical: 80,
                    projects: 85,
                    resume: 70,
                    interview: 65
                },
                strengths: [
                    "Strong foundation in core Data Structures & Algorithms with consistent problem-solving frequency.",
                    "Excellent project portfolio demonstrating practical use of modern full-stack technologies (React, Node.js).",
                    "Good grasp of database management concepts and OS fundamentals."
                ],
                weaknesses: [
                    "Resume lacks quantifiable metrics and ATS optimization.",
                    "HR and behavioral interview confidence needs improvement; tends to rush technical explanations.",
                    "Logical reasoning speed in timed aptitude tests is slightly below average."
                ],
                recommendations: [
                    "🚀 Implement 2 medium/hard LeetCode problems daily focusing on Dynamic Programming and Graphs to push your Coding score above 90%.",
                    "⏱️ Dedicate 30 mins/day to timed Aptitude tests (Quantitative + Logical) to improve your speed and accuracy under pressure.",
                    "📄 Quantify your Resume achievements (e.g., 'Optimized query speed by 40%') and ensure strong ATS keyword alignment for backend roles.",
                    "🗣️ Schedule 2 peer Mock Interviews this week focusing heavily on the STAR behavioral method and communicating technical tradeoffs clearly."
                ]
            };
            setReport(mockData);
            setLoading(false);
        }, 2500); // 2.5s delay to feel like AI generating
    };

    const ProgressBar = ({ label, score, icon }) => (
        <div className="pr-bar-group">
            <div className="pr-bar-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {icon} {label}
                </span>
                <span className="text-gradient" style={{ fontWeight: 'bold' }}>{score}%</span>
            </div>
            <div className="pr-bar-container">
                <div
                    className="pr-bar-fill"
                    style={{ width: `${score}%`, opacity: report ? 1 : 0 }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="placement-readiness-container">
            <div className="ai-mentor-badge">
                <AutoAwesomeIcon style={{ fontSize: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
                AI MENTOR
            </div>

            <div className="pr-header">
                <h2 className="pr-title">
                    <SmartToyIcon style={{ color: '#3b82f6', fontSize: '2rem' }} />
                    Placement Readiness Analysis
                </h2>
                {report && (
                    <div className="pr-score-circle" style={{ '--score': report.overallScore }}>
                        <div className="pr-score-inner">
                            <h3>{report.overallScore}</h3>
                            <span>/ 100</span>
                        </div>
                    </div>
                )}
            </div>

            {!report && !loading && (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                        I am your AI Placement Mentor. I can analyze your coding stats, project quality, resume strength, and mock interview performance to generate a comprehensive placement readiness score and actionable roadmap.
                    </p>
                    <button className="ai-generate-btn" onClick={generateReport}>
                        <AutoAwesomeIcon /> Generate AI Readiness Report
                    </button>
                </div>
            )}

            {loading && (
                <div className="ai-loader">
                    <div className="ai-pulse"></div>
                    <h3 className="text-gradient">Analyzing your profile & performance metrics...</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Evaluating projects, skills, and test scores.</p>
                </div>
            )}

            {report && !loading && (
                <div className="pr-grid">

                    {/* Score Breakdown Section */}
                    <div className="pr-section">
                        <h3 className="pr-section-title">
                            <TrendingUpIcon style={{ color: '#3b82f6' }} /> Score Breakdown
                        </h3>
                        <ProgressBar label="Coding Skills" score={report.breakdown.coding} icon={<CodeIcon fontSize="small" color="action" />} />
                        <ProgressBar label="Aptitude" score={report.breakdown.aptitude} icon={<PsychologyIcon fontSize="small" color="action" />} />
                        <ProgressBar label="Technical Knowledge" score={report.breakdown.technical} icon={<ConstructionIcon fontSize="small" color="action" />} />
                        <ProgressBar label="Project Quality" score={report.breakdown.projects} icon={<WorkOutlineIcon fontSize="small" color="action" />} />
                        <ProgressBar label="Resume Strength" score={report.breakdown.resume} icon={<DescriptionIcon fontSize="small" color="action" />} />
                        <ProgressBar label="Mock Interview" score={report.breakdown.interview} icon={<CheckCircleIcon fontSize="small" color="action" />} />
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="pr-section">
                            <h3 className="pr-section-title" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                                <CheckCircleIcon style={{ color: '#10b981' }} /> Key Strengths
                            </h3>
                            <ul className="pr-list">
                                {report.strengths.map((item, idx) => (
                                    <li key={idx}>
                                        <CheckCircleIcon className="pr-icon-success" fontSize="small" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pr-section">
                            <h3 className="pr-section-title" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
                                <WarningIcon style={{ color: '#f59e0b' }} /> Areas for Improvement
                            </h3>
                            <ul className="pr-list">
                                {report.weaknesses.map((item, idx) => (
                                    <li key={idx}>
                                        <WarningIcon className="pr-icon-warning" fontSize="small" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Recommendations - Full Width */}
                    <div className="pr-section full-width">
                        <h3 className="pr-section-title" style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                            <LightbulbIcon style={{ color: '#3b82f6' }} /> Actionable Recommendations
                        </h3>
                        <div className="recommendations-grid">
                            {report.recommendations.map((item, idx) => (
                                <div className="rec-card" key={idx}>
                                    <div className="rec-number">{idx + 1}</div>
                                    <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="btn-ghost"
                        style={{ gridColumn: '1 / -1', justifySelf: 'center', marginTop: '1rem' }}
                        onClick={() => setReport(null)}
                    >
                        Reset Analysis
                    </button>
                </div>
            )}
        </div>
    );
}
