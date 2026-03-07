import React, { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
    AreaChart
} from 'recharts';
import '../styles/PerformanceAnalyst.css';

// Icons
import InsightsIcon from '@mui/icons-material/Insights';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Mock Historical Data
const historicalData = [
    { month: 'Oct', coding: 45, aptitude: 60, technical: 55, interview: 40 },
    { month: 'Nov', coding: 55, aptitude: 62, technical: 60, interview: 45 },
    { month: 'Dec', coding: 65, aptitude: 65, technical: 68, interview: 50 },
    { month: 'Jan', coding: 72, aptitude: 68, technical: 75, interview: 55 },
    { month: 'Feb', coding: 78, aptitude: 72, technical: 78, interview: 60 },
    { month: 'Mar', coding: 82, aptitude: 75, technical: 80, interview: 65 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`Month: ${label}`}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }}>
                        {`${entry.name}: ${entry.value}%`}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function PerformanceAnalyst({ user }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate data fetching and AI analysis model running
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // AI Generated Insights based on mockData
    const insights = {
        trends: [
            { category: 'Coding Skills', status: 'improving', message: 'Consistent upward trajectory over the last 6 months (+37%).' },
            { category: 'Technical Knowledge', status: 'improving', message: 'Strong, steady growth aligning with coding improvements (+25%).' },
            { category: 'Aptitude', status: 'stable', message: 'Slow but steady growth; currently plateauing around 75%.' }
        ],
        topSkills: [
            'Data Structures & Algorithms Implementation',
            'Core OS and DBMS Concepts'
        ],
        stagnatingAreas: [
            'Mock Interview Performance (HR/Behavioral)',
            'Quantitative Aptitude Speed'
        ],
        summary: "You are showing excellent dedication to technical skills. Your trajectory in Coding and Technical Knowledge means you are highly competitive for SDE roles. However, your mock interview and aptitude scores are lagging behind your technical abilities. Focusing on communication and timed practice will bridge this gap and result in significantly higher conversion rates."
    };

    const StatusIcon = ({ status }) => {
        if (status === 'improving') return <TrendingUpIcon className="trend-up" fontSize="small" />;
        if (status === 'stable') return <TrendingFlatIcon className="trend-stable" fontSize="small" />;
        return <TrendingDownIcon className="trend-down" fontSize="small" />;
    };

    if (loading) {
        return (
            <div className="performance-analyst-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div className="ai-loader">
                    <div className="ai-pulse" style={{ width: '40px', height: '40px' }}></div>
                    <h3 className="text-gradient">AI Processing Historical Data...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="performance-analyst-container">
            <div className="ai-mentor-badge">
                <InsightsIcon style={{ fontSize: '14px', marginRight: '4px', verticalAlign: 'middle' }} />
                AI ANALYST
            </div>

            <div className="performance-header">
                <h2 className="performance-title">
                    <InsightsIcon style={{ color: '#6366f1', fontSize: '2rem' }} />
                    Performance History & Insights
                </h2>
            </div>

            <div className="pa-grid">

                {/* Left Column: Visual Chart */}
                <div className="chart-section">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                        <TrendingUpIcon style={{ color: '#6366f1' }} /> Progress Over Time
                    </h3>

                    <div style={{ width: '100%', height: 350 }}>
                        <ResponsiveContainer>
                            <LineChart
                                data={historicalData}
                                margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                                <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} domain={[0, 100]} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ paddingTop: '20px' }} />

                                <Line type="monotone" dataKey="coding" name="Coding" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="technical" name="Technical" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="aptitude" name="Aptitude" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="interview" name="Mock Interview" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: AI Insights */}
                <div className="insights-section">

                    {/* Performance Trends */}
                    <div className="insight-card">
                        <div className="insight-header">
                            <TrendingUpIcon style={{ color: '#6366f1' }} fontSize="small" /> Trend Analysis
                        </div>
                        <ul className="pr-list" style={{ marginTop: '0.5rem' }}>
                            {insights.trends.map((trend, idx) => (
                                <li key={idx} style={{ alignItems: 'flex-start' }}>
                                    <StatusIcon status={trend.status} />
                                    <div>
                                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{trend.category}</strong>
                                        <span style={{ fontSize: '0.85rem' }}>{trend.message}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Top Skills */}
                    <div className="insight-card" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                        <div className="insight-header" style={{ color: '#10b981' }}>
                            <AssignmentTurnedInIcon fontSize="small" /> Strongest Areas
                        </div>
                        <ul className="pr-list" style={{ marginTop: '0.5rem' }}>
                            {insights.topSkills.map((skill, idx) => (
                                <li key={idx}>• {skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Stagnating Areas */}
                    <div className="insight-card" style={{ gap: '0.5rem', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                        <div className="insight-header" style={{ color: '#f59e0b' }}>
                            <WarningAmberIcon fontSize="small" /> Stagnating Areas
                        </div>
                        <ul className="pr-list" style={{ marginTop: '0.5rem' }}>
                            {insights.stagnatingAreas.map((area, idx) => (
                                <li key={idx}>• {area}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* AI Summary Bottom Bar */}
            <div className="summary-box">
                <h4><InsightsIcon fontSize="small" /> AI Mentor Summary & Verdict</h4>
                <p>{insights.summary}</p>
            </div>

        </div>
    );
}
