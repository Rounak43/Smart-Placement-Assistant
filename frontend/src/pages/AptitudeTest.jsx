import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AptitudeTest.css';

const sections = [
    {
        id: 'quant',
        icon: '🧮',
        title: 'Quantitative Aptitude',
        description: 'Tests mathematical ability and numerical reasoning. Core of most placement exams.',
        topics: ['Number System', 'Percentages', 'Profit & Loss', 'Time & Work', 'Speed & Distance', 'Algebra', 'Geometry'],
        levels: ['Easy', 'Medium', 'Hard'],
        color: '#3B82F6'
    },
    {
        id: 'logical',
        icon: '🧠',
        title: 'Logical Reasoning',
        description: 'Evaluates pattern recognition, analytical thinking, and problem-solving skills.',
        topics: ['Syllogisms', 'Blood Relations', 'Coding–Decoding', 'Seating Arrangements', 'Puzzles', 'Direction Sense'],
        levels: ['Easy', 'Medium', 'Hard'],
        color: '#8B5CF6'
    },
    {
        id: 'verbal',
        icon: '📖',
        title: 'Verbal Ability',
        description: 'Measures English language skills including reading comprehension and grammar.',
        topics: ['Reading Comprehension', 'Grammar', 'Vocabulary', 'Fill in the Blanks', 'Para Jumbles', 'Error Spotting'],
        levels: ['Easy', 'Medium', 'Hard'],
        color: '#10B981'
    },
    {
        id: 'di',
        icon: '📊',
        title: 'Data Interpretation',
        description: 'Tests the ability to analyze data from charts, graphs, tables and draw conclusions.',
        topics: ['Bar Charts', 'Line Graphs', 'Pie Charts', 'Tables', 'Caselet DI', 'Mixed Graphs'],
        levels: ['Easy', 'Medium', 'Hard'],
        color: '#F59E0B'
    }
];

const tips = [
    { icon: '📅', title: 'Practice Daily', desc: 'Spend at least 30–45 minutes solving aptitude problems every day to build speed and accuracy.' },
    { icon: '🎯', title: 'Focus on Weak Areas', desc: 'Identify sections where you struggle and dedicate extra time to master those topics first.' },
    { icon: '⚡', title: 'Improve Speed', desc: 'Time yourself while solving problems. Aim to solve 40 questions in under 40 minutes.' },
    { icon: '📝', title: 'Analyze Mistakes', desc: 'Review every wrong answer. Understanding why you got it wrong prevents repeating mistakes.' },
    { icon: '📚', title: 'Learn Shortcuts', desc: 'Memorize key formulae and mental math tricks to solve problems faster during the actual test.' },
    { icon: '🔁', title: 'Mock Tests', desc: 'Take full-length mock tests under exam conditions to simulate the real placement experience.' }
];

export default function AptitudeTest() {
    const navigate = useNavigate();

    return (
        <div className="apt-container">
            {/* Header */}
            <div className="apt-header">
                <div className="apt-header-left">
                    <h1 className="apt-title">Aptitude Test Preparation</h1>
                    <p className="apt-subtitle">
                        Master aptitude tests for top companies like <strong>TCS, Infosys, Accenture, Cognizant, Wipro</strong> and more.
                        Our structured practice modules cover every topic tested in campus placements.
                    </p>
                    <p className="apt-motivational">
                        💡 Consistent daily practice is the key to cracking placement aptitude tests!
                    </p>
                </div>
                <button className="apt-take-test-btn" onClick={() => navigate('/aptitude-exam')}>
                    <span className="btn-icon">🚀</span>
                    Take Test
                </button>
            </div>

            {/* Overview card */}
            <div className="apt-overview-card">
                <div className="apt-overview-icon">🎓</div>
                <div className="apt-overview-text">
                    <h2>What is an Aptitude Test?</h2>
                    <p>
                        Aptitude tests are standardized assessments used by companies during campus recruitment
                        to evaluate a candidate's problem-solving abilities, mathematical skills, logical thinking,
                        and English proficiency. Almost every major IT and service-sector company includes an
                        aptitude round as the first stage of their selection process.
                    </p>
                    <p>
                        Scoring well in the aptitude test can directly determine whether you advance to the
                        technical interview round. Regular practice with our module will help you <strong>improve
                            accuracy, build confidence, and develop exam speed</strong>.
                    </p>
                </div>
            </div>

            {/* Section Cards */}
            <div className="apt-section-title">
                <h2>Test Sections</h2>
                <p>All four sections covered in our practice environment</p>
            </div>
            <div className="apt-sections-grid">
                {sections.map(section => (
                    <div key={section.id} className="apt-section-card" style={{ '--card-color': section.color }}>
                        <div className="apt-card-header">
                            <span className="apt-card-icon">{section.icon}</span>
                            <h3>{section.title}</h3>
                        </div>
                        <p className="apt-card-desc">{section.description}</p>
                        <div className="apt-card-topics">
                            <span className="topics-label">Key Topics:</span>
                            <div className="apt-topics-list">
                                {section.topics.map(topic => (
                                    <span key={topic} className="apt-topic-badge">{topic}</span>
                                ))}
                            </div>
                        </div>
                        <div className="apt-difficulty-row">
                            {section.levels.map(level => (
                                <span key={level} className={`apt-diff-badge diff-${level.toLowerCase()}`}>
                                    {level}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Test Pattern Table */}
            <div className="apt-section-title" style={{ marginTop: '3rem' }}>
                <h2>Test Pattern</h2>
                <p>Typical structure of a campus placement aptitude test</p>
            </div>
            <div className="apt-table-wrapper">
                <table className="apt-pattern-table">
                    <thead>
                        <tr>
                            <th>Section</th>
                            <th>Questions</th>
                            <th>Time Allotted</th>
                            <th>Difficulty</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span className="table-section-icon">🧮</span> Quantitative Aptitude</td>
                            <td><span className="table-badge">10</span></td>
                            <td>10 mins</td>
                            <td>Easy – Hard</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td><span className="table-section-icon">🧠</span> Logical Reasoning</td>
                            <td><span className="table-badge">10</span></td>
                            <td>10 mins</td>
                            <td>Easy – Hard</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td><span className="table-section-icon">📖</span> Verbal Ability</td>
                            <td><span className="table-badge">10</span></td>
                            <td>10 mins</td>
                            <td>Easy – Hard</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td><span className="table-section-icon">📊</span> Data Interpretation</td>
                            <td><span className="table-badge">10</span></td>
                            <td>10 mins</td>
                            <td>Easy – Hard</td>
                            <td>10</td>
                        </tr>
                        <tr className="apt-table-total">
                            <td><strong>Total</strong></td>
                            <td><strong>40</strong></td>
                            <td><strong>40 mins</strong></td>
                            <td>–</td>
                            <td><strong>40</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Preparation Tips */}
            <div className="apt-section-title" style={{ marginTop: '3rem' }}>
                <h2>Preparation Tips</h2>
                <p>Strategies to maximise your aptitude test score</p>
            </div>
            <div className="apt-tips-grid">
                {tips.map(tip => (
                    <div key={tip.title} className="apt-tip-card">
                        <div className="apt-tip-icon">{tip.icon}</div>
                        <h4>{tip.title}</h4>
                        <p>{tip.desc}</p>
                    </div>
                ))}
            </div>

            {/* CTA Banner */}
            <div className="apt-cta-banner">
                <div className="apt-cta-text">
                    <h2>Ready to Test Your Skills?</h2>
                    <p>Take a full mock aptitude test and get detailed performance analysis</p>
                </div>
                <button className="apt-take-test-btn large" onClick={() => navigate('/aptitude-exam')}>
                    <span className="btn-icon">🚀</span>
                    Start Test Now
                </button>
            </div>

        </div>
    );
}
