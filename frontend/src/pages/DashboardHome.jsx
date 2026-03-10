import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { motion } from 'framer-motion';
import '../styles/DashboardHome.css';

import SpeedIcon from '@mui/icons-material/Speed';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

export default function DashboardHome() {
    const { user } = useOutletContext() || {};
    const [dbName, setDbName] = useState('');
    const [aimlRoadmap, setAimlRoadmap] = useState(null);
    const [webDevRoadmap, setWebDevRoadmap] = useState(null);
    const [softwareEngineeringRoadmap, setSoftwareEngRoadmap] = useState(null);
    const [dataScienceRoadmap, setDataScienceRoadmap] = useState(null);
    const [dataAnalysisRoadmap, setDataAnalysisRoadmap] = useState(null);
    const [focusArea, setFocusArea] = useState('AI / ML');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const docRef = doc(db, 'users', user.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.name) {
                    setDbName(data.name);
                }
                if (data.aimlRoadmap) {
                    setAimlRoadmap(data.aimlRoadmap);
                } else {
                    setAimlRoadmap({});
                }
                if (data.webDevRoadmap) {
                    setWebDevRoadmap(data.webDevRoadmap);
                } else {
                    setWebDevRoadmap({});
                }
                if (data.softwareEngineeringRoadmap) {
                    setSoftwareEngRoadmap(data.softwareEngineeringRoadmap);
                } else {
                    setSoftwareEngRoadmap({});
                }
                if (data.dataScienceRoadmap) {
                    setDataScienceRoadmap(data.dataScienceRoadmap);
                } else {
                    setDataScienceRoadmap({});
                }
                if (data.dataAnalysisRoadmap) {
                    setDataAnalysisRoadmap(data.dataAnalysisRoadmap);
                } else {
                    setDataAnalysisRoadmap({});
                }
                if (data.focusArea) {
                    setFocusArea(data.focusArea);
                }
            }
            setLoading(false);
        }, (error) => {
            console.error("DashboardHome: Error fetching user data from Firestore:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const displayFirstName = dbName
        ? dbName.split(' ')[0]
        : (user?.displayName ? user.displayName.split(' ')[0] : 'User');

    // Calculate stats based on focus area
    let completedCount = 0;
    let unlockedTotal = 1; // Step 1 is always unlocked
    let activeRoadmapData = {};
    let focusAreaLabel = 'AI/ML Readiness Score';
    let welcomeSubTitle = 'AI/ML';

    if (focusArea === 'Web Development') {
        activeRoadmapData = webDevRoadmap;
        focusAreaLabel = 'Web Dev Readiness Score';
        welcomeSubTitle = 'Web Development';
    } else if (focusArea === 'Software Engineering') {
        activeRoadmapData = softwareEngineeringRoadmap;
        focusAreaLabel = 'Software Engineering Readiness Score';
        welcomeSubTitle = 'Software Engineering';
    } else if (focusArea === 'Data Science') {
        activeRoadmapData = dataScienceRoadmap;
        focusAreaLabel = 'Data Science Readiness Score';
        welcomeSubTitle = 'Data Science';
    } else if (focusArea === 'Data Analysis') {
        activeRoadmapData = dataAnalysisRoadmap;
        focusAreaLabel = 'Data Analysis Readiness Score';
        welcomeSubTitle = 'Data Analysis';
    } else {
        activeRoadmapData = aimlRoadmap;
    }

    if (activeRoadmapData) {
        for (let i = 1; i <= 10; i++) {
            if (activeRoadmapData[`step${i}Passed`] === true) {
                completedCount++;
            }
        }
        for (let i = 2; i <= 10; i++) {
            if (activeRoadmapData[`step${i - 1}Passed`] === true) {
                unlockedTotal++;
            }
        }
    }

    const readinessScore = Math.round((completedCount / 10) * 100);
    const inProgressCount = unlockedTotal - completedCount;
    const lockedCount = 10 - unlockedTotal;

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-primary)' }}>Loading dashboard...</div>;
    }

    return (
        <div className="dashboard-home-container">
            {/* Section 1: Welcome Header */}
            <header className="dash-header dash-header-centered">
                <motion.div
                    className="dash-welcome"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Welcome back, {displayFirstName} 🚀</h1>
                    <p>Track your {welcomeSubTitle} progress, improve your skills, and get closer to your dream job every day.</p>
                </motion.div>
            </header>

            {/* AI/ML Stats Grid */}
            <div className="dash-stats-grid">
                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <div className="stat-icon readiness">
                        <SpeedIcon fontSize="large" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">
                            {focusAreaLabel}
                        </span>
                        <h3 className="stat-value">{readinessScore}%</h3>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="stat-icon completed">
                        <CheckCircleIcon fontSize="large" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Completed Steps</span>
                        <h3 className="stat-value">{completedCount} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/10</span></h3>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="stat-icon unlocked">
                        <LockOpenIcon fontSize="large" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Unlocked Steps</span>
                        <h3 className="stat-value">{unlockedTotal}</h3>
                    </div>
                </motion.div>

                <motion.div
                    className="stat-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="stat-icon locked">
                        <LockIcon fontSize="large" />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Locked Steps</span>
                        <h3 className="stat-value">{lockedCount}</h3>
                    </div>
                </motion.div>
            </div>

            {/* Quick Progression View */}
            <motion.div
                className="dash-progress-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/dashboard/roadmap')}
            >
                <h2>Overall Course Progress</h2>
                <div className="dash-progress-track">
                    <motion.div
                        className="dash-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${readinessScore}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                    />
                </div>
                <div className="dash-progress-text">
                    <span>{completedCount} of 10 milestones completed</span>
                    <span style={{ color: '#3b82f6', fontWeight: 600 }}>Continue Learning &rarr;</span>
                </div>
            </motion.div>

        </div>
    );
}
