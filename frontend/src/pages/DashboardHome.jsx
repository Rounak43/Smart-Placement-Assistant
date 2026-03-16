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
import CodeIcon from '@mui/icons-material/Code';
import QuizIcon from '@mui/icons-material/Quiz';
import TimerIcon from '@mui/icons-material/Timer';

import { dsaTopics } from '../data/dsaTopics';

// Build a lookup: problemId -> difficulty
const problemDifficultyMap = {};
let totalEasyProblems = 0, totalMediumProblems = 0, totalHardProblems = 0;
dsaTopics.forEach(topic => {
    topic.problems.forEach(p => {
        problemDifficultyMap[p.id] = p.difficulty;
        if (p.difficulty === 'Easy') totalEasyProblems++;
        else if (p.difficulty === 'Medium') totalMediumProblems++;
        else if (p.difficulty === 'Hard') totalHardProblems++;
    });
});

const ROADMAP_KEYS = [
    'aimlRoadmap',
    'webDevRoadmap',
    'softwareEngineeringRoadmap',
    'dataScienceRoadmap',
    'dataAnalysisRoadmap',
];

function formatTime(seconds) {
    if (!seconds && seconds !== 0) return '—';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

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

    // New state for additional stats
    const [dsaProgress, setDsaProgress] = useState({});
    const [aptitudeLastResult, setAptitudeLastResult] = useState(null);

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
                if (data.name) setDbName(data.name);

                setAimlRoadmap(data.aimlRoadmap || {});
                setWebDevRoadmap(data.webDevRoadmap || {});
                setSoftwareEngRoadmap(data.softwareEngineeringRoadmap || {});
                setDataScienceRoadmap(data.dataScienceRoadmap || {});
                setDataAnalysisRoadmap(data.dataAnalysisRoadmap || {});

                if (data.focusArea) setFocusArea(data.focusArea);

                // New stats
                setDsaProgress(data.dsaPracticeProgress || {});
                setAptitudeLastResult(data.aptitudeLastResult || null);
            }
            setLoading(false);
        }, (error) => {
            console.error('DashboardHome: Error fetching user data:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const displayFirstName = dbName
        ? dbName.split(' ')[0]
        : (user?.displayName ? user.displayName.split(' ')[0] : 'User');

    // ── Roadmap Stats ──────────────────────────────────────────────────────────
    let completedCount = 0;
    let unlockedTotal = 1;
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
            if (activeRoadmapData[`step${i}Passed`] === true) completedCount++;
        }
        for (let i = 2; i <= 10; i++) {
            if (activeRoadmapData[`step${i - 1}Passed`] === true) unlockedTotal++;
        }
    }

    const readinessScore = Math.round((completedCount / 10) * 100);
    const lockedCount = 10 - unlockedTotal;

    // ── DSA Stats ─────────────────────────────────────────────────────────────
    let easySolved = 0, mediumSolved = 0, hardSolved = 0;
    Object.entries(dsaProgress).forEach(([id, solved]) => {
        if (!solved) return;
        const diff = problemDifficultyMap[id];
        if (diff === 'Easy') easySolved++;
        else if (diff === 'Medium') mediumSolved++;
        else if (diff === 'Hard') hardSolved++;
    });
    const totalDsaSolved = easySolved + mediumSolved + hardSolved;
    const totalDsaProblems = dsaTopics.reduce((acc, t) => acc + t.problems.length, 0);

    // ── Quiz Accuracy (all roadmaps combined) ─────────────────────────────────
    const allRoadmapData = [
        aimlRoadmap,
        webDevRoadmap,
        softwareEngineeringRoadmap,
        dataScienceRoadmap,
        dataAnalysisRoadmap,
    ];

    let quizTotalCorrect = 0;
    let quizTotalQuestions = 0;

    allRoadmapData.forEach(rd => {
        if (!rd) return;
        for (let i = 1; i <= 10; i++) {
            const score = rd[`step${i}Score`];
            const total = rd[`step${i}Total`];
            if (score !== undefined && total !== undefined) {
                quizTotalCorrect += score;
                quizTotalQuestions += total;
            }
        }
    });

    const quizAccuracy = quizTotalQuestions > 0
        ? Math.round((quizTotalCorrect / quizTotalQuestions) * 100)
        : null;

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-primary)' }}>
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="dashboard-home-container">
            {/* Welcome Header */}
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

            {/* Roadmap Stats Grid */}
            <div className="dash-stats-grid">
                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    <div className="stat-icon readiness"><SpeedIcon fontSize="large" /></div>
                    <div className="stat-content">
                        <span className="stat-label">{focusAreaLabel}</span>
                        <h3 className="stat-value">{readinessScore}%</h3>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <div className="stat-icon completed"><CheckCircleIcon fontSize="large" /></div>
                    <div className="stat-content">
                        <span className="stat-label">Completed Steps</span>
                        <h3 className="stat-value">{completedCount} <span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/10</span></h3>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <div className="stat-icon unlocked"><LockOpenIcon fontSize="large" /></div>
                    <div className="stat-content">
                        <span className="stat-label">Unlocked Steps</span>
                        <h3 className="stat-value">{unlockedTotal}</h3>
                    </div>
                </motion.div>

                <motion.div className="stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <div className="stat-icon locked"><LockIcon fontSize="large" /></div>
                    <div className="stat-content">
                        <span className="stat-label">Locked Steps</span>
                        <h3 className="stat-value">{lockedCount}</h3>
                    </div>
                </motion.div>
            </div>

            {/* ── NEW STATS ROW ─────────────────────────────────────────── */}
            <div className="dash-extra-stats-grid">

                {/* DSA Problems Card */}
                <motion.div
                    className="extra-stat-card dsa-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard/dsa')}
                >
                    <div className="extra-stat-header">
                        <div className="stat-icon dsa"><CodeIcon fontSize="large" /></div>
                        <div className="extra-stat-title-group">
                            <span className="stat-label">DSA Problems Solved</span>
                            <h3 className="stat-value">
                                {totalDsaSolved}
                                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}> / {totalDsaProblems}</span>
                            </h3>
                        </div>
                    </div>

                    <div className="dsa-difficulty-breakdown">
                        {/* Easy */}
                        <div className="diff-pill-group">
                            <div className="diff-pill easy">
                                <span className="diff-dot easy-dot" />
                                <span className="diff-label">Easy</span>
                                <span className="diff-count">{easySolved}<span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>/{totalEasyProblems}</span></span>
                            </div>
                            <div className="diff-mini-bar-track">
                                <motion.div
                                    className="diff-mini-bar easy-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(easySolved / totalEasyProblems) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                />
                            </div>
                        </div>
                        {/* Medium */}
                        <div className="diff-pill-group">
                            <div className="diff-pill medium">
                                <span className="diff-dot medium-dot" />
                                <span className="diff-label">Medium</span>
                                <span className="diff-count">{mediumSolved}<span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>/{totalMediumProblems}</span></span>
                            </div>
                            <div className="diff-mini-bar-track">
                                <motion.div
                                    className="diff-mini-bar medium-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(mediumSolved / totalMediumProblems) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 1.0 }}
                                />
                            </div>
                        </div>
                        {/* Hard */}
                        <div className="diff-pill-group">
                            <div className="diff-pill hard">
                                <span className="diff-dot hard-dot" />
                                <span className="diff-label">Hard</span>
                                <span className="diff-count">{hardSolved}<span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>/{totalHardProblems}</span></span>
                            </div>
                            <div className="diff-mini-bar-track">
                                <motion.div
                                    className="diff-mini-bar hard-bar"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(hardSolved / totalHardProblems) * 100}%` }}
                                    transition={{ duration: 0.8, delay: 1.1 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Quiz Accuracy Card */}
                <motion.div
                    className="extra-stat-card quiz-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard/roadmap')}
                >
                    <div className="extra-stat-header">
                        <div className="stat-icon quiz"><QuizIcon fontSize="large" /></div>
                        <div className="extra-stat-title-group">
                            <span className="stat-label">Roadmap Quiz Accuracy</span>
                            <h3 className="stat-value">
                                {quizAccuracy !== null ? `${quizAccuracy}%` : '—'}
                            </h3>
                        </div>
                    </div>

                    <div className="quiz-accuracy-detail">
                        <div className="quiz-acc-bar-track">
                            <motion.div
                                className="quiz-acc-bar-fill"
                                initial={{ width: 0 }}
                                animate={{ width: quizAccuracy !== null ? `${quizAccuracy}%` : '0%' }}
                                transition={{ duration: 1, delay: 1.0 }}
                            />
                        </div>
                        <div className="quiz-acc-sub">
                            {quizTotalQuestions > 0
                                ? <><span className="acc-correct">{quizTotalCorrect} correct</span> out of {quizTotalQuestions} total quiz questions</>
                                : <span style={{ color: 'var(--text-secondary)' }}>Complete a roadmap quiz to see your accuracy</span>
                            }
                        </div>
                    </div>
                </motion.div>

                {/* Aptitude Test Card */}
                <motion.div
                    className="extra-stat-card aptitude-card"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/dashboard/aptitude')}
                >
                    <div className="extra-stat-header">
                        <div className="stat-icon aptitude"><TimerIcon fontSize="large" /></div>
                        <div className="extra-stat-title-group">
                            <span className="stat-label">Last Aptitude Test</span>
                            <h3 className="stat-value">
                                {aptitudeLastResult
                                    ? <>{aptitudeLastResult.score}<span style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: 500 }}>/{aptitudeLastResult.total}</span></>
                                    : '—'}
                            </h3>
                        </div>
                    </div>

                    {aptitudeLastResult ? (
                        <div className="aptitude-detail-row">
                            <div className="apt-chip accuracy-chip">
                                <span className="apt-chip-icon">🎯</span>
                                <span className="apt-chip-label">Accuracy</span>
                                <span className="apt-chip-val">{aptitudeLastResult.accuracy}%</span>
                            </div>
                            <div className="apt-chip correct-chip">
                                <span className="apt-chip-icon">✅</span>
                                <span className="apt-chip-label">Correctly Answered</span>
                                <span className="apt-chip-val">{aptitudeLastResult.correctlyAnswered ?? aptitudeLastResult.score}</span>
                            </div>
                            <div className="apt-chip time-chip">
                                <span className="apt-chip-icon">⏱</span>
                                <span className="apt-chip-label">Time Taken</span>
                                <span className="apt-chip-val">{formatTime(aptitudeLastResult.timeTaken)}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="apt-empty">
                            <span>Take the aptitude test to see your results here.</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Overall Progress */}
            <motion.div
                className="dash-progress-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/dashboard/roadmap')}
            >
                <h2>Overall Course Progress</h2>
                <div className="dash-progress-track">
                    <motion.div
                        className="dash-progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${readinessScore}%` }}
                        transition={{ duration: 1, delay: 1.1 }}
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
