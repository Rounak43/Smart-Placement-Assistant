import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useOutletContext } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import '../styles/DsaPractice.css';

// Import problem dataset containing 350+ curated DSA questions
import { dsaTopics } from '../data/dsaTopics';

const totalProblemsCount = dsaTopics.reduce((acc, topic) => acc + topic.problems.length, 0);

// --- Small helper to map generic company names to logos ---
// Using clearbit logo API or simple text badges as fallback.
const CompanyLogo = ({ company }) => {
    // Map company name to a domain for clearbit
    const domains = {
        'Google': 'google.com',
        'Amazon': 'amazon.com',
        'Microsoft': 'microsoft.com',
        'Meta': 'meta.com',
        'Apple': 'apple.com',
        'Netflix': 'netflix.com',
        'Uber': 'uber.com'
    };

    const domain = domains[company];
    return domain ? (
        <img
            src={`https://logo.clearbit.com/${domain}?size=24`}
            alt={`${company} logo`}
            className="company-logo"
            title={company}
            onError={(e) => { e.target.style.display = 'none' }} // fallback if fails
        />
    ) : (
        <span className="company-badge-fallback">{company}</span>
    );
};

export default function DsaPractice() {
    const { user } = useOutletContext();
    const [progressData, setProgressData] = useState({});
    const [savedProblemsData, setSavedProblemsData] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedTopics, setExpandedTopics] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('All'); // All, Easy, Medium, Hard

    useEffect(() => {
        const fetchProgress = async () => {
            if (!user?.uid) return;
            try {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.dsaPracticeProgress) {
                        setProgressData(data.dsaPracticeProgress);
                    }
                    if (data.dsaSavedProblems) {
                        setSavedProblemsData(data.dsaSavedProblems);
                    }
                }
            } catch (err) {
                console.error("Error fetching DSA progress:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, [user]);

    useEffect(() => {
        if (!loading) {
            const hasSavedProblems = Object.values(savedProblemsData).filter(Boolean).length > 0;
            setExpandedTopics({
                [hasSavedProblems ? 'saved-problems' : dsaTopics[0].topicId]: true
            });
        }
    }, [loading, savedProblemsData]);

    const handleToggleSaveProblem = async (problemId) => {
        if (!user?.uid) return;

        const isCurrentlySaved = !!savedProblemsData[problemId];
        const newSavedStatus = !isCurrentlySaved;

        setSavedProblemsData(prev => ({
            ...prev,
            [problemId]: newSavedStatus
        }));

        try {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                [`dsaSavedProblems.${problemId}`]: newSavedStatus
            });
        } catch (err) {
            console.error("Error updating DSA saved problems:", err);
            setSavedProblemsData(prev => ({
                ...prev,
                [problemId]: isCurrentlySaved
            }));
            if (err.code === 'not-found' || err.message.includes('No document to update')) {
                const docRef = doc(db, 'users', user.uid);
                await setDoc(docRef, { dsaSavedProblems: { [problemId]: newSavedStatus } }, { merge: true });
            }
        }
    };

    const handleToggleProblem = async (problemId) => {
        if (!user?.uid) return;

        const isCurrentlySolved = !!progressData[problemId];
        const newSolvedStatus = !isCurrentlySolved;

        // Optimistic UI update
        setProgressData(prev => ({
            ...prev,
            [problemId]: newSolvedStatus
        }));

        try {
            const docRef = doc(db, 'users', user.uid);
            await updateDoc(docRef, {
                [`dsaPracticeProgress.${problemId}`]: newSolvedStatus
            });
        } catch (err) {
            console.error("Error updating DSA progress:", err);
            // Revert on failure
            setProgressData(prev => ({
                ...prev,
                [problemId]: isCurrentlySolved
            }));

            // If the document doesn't have the field or doesn't exist, we might need a general setDoc with merge
            if (err.code === 'not-found' || err.message.includes('No document to update')) {
                const docRef = doc(db, 'users', user.uid);
                await setDoc(docRef, { dsaPracticeProgress: { [problemId]: newSolvedStatus } }, { merge: true });
            }
        }
    };

    const toggleTopic = (topicId) => {
        setExpandedTopics(prev => ({
            ...prev,
            [topicId]: !prev[topicId]
        }));
    };

    const solvedProblemsCount = Object.values(progressData).filter(Boolean).length;
    const progressPercentage = totalProblemsCount === 0 ? 0 : Math.round((solvedProblemsCount / totalProblemsCount) * 100);

    const savedProblemsList = dsaTopics
        .flatMap(topic => topic.problems)
        .filter(prob => savedProblemsData[prob.id]);

    const dynamicTopics = [
        ...(savedProblemsList.length > 0 ? [{
            topicId: 'saved-problems',
            topicName: 'Saved Problems',
            problems: savedProblemsList
        }] : []),
        ...dsaTopics
    ];

    // Filtering logic
    const filteredTopics = dynamicTopics.map(topic => {
        const filteredProblems = topic.problems.filter(prob => {
            const matchesSearch = prob.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDifficulty = difficultyFilter === 'All' || prob.difficulty === difficultyFilter;
            return matchesSearch && matchesDifficulty;
        });
        return { ...topic, problems: filteredProblems };
    }).filter(topic => topic.problems.length > 0);

    if (loading) {
        return <div className="dsa-practice-loading">Loading Practice Tracker...</div>;
    }

    return (
        <div className="dsa-practice-container">
            <header className="dsa-header">
                <div className="dsa-header-text">
                    <h1>DSA Practice Tracker</h1>
                    <p>Track your progress and master Data Structures and Algorithms for technical interviews.</p>
                </div>

                <div className="dsa-progress-card">
                    <div className="dsa-progress-header">
                        <h3>DSA Practice Progress</h3>
                        <span>{solvedProblemsCount} / {totalProblemsCount}</span>
                    </div>
                    <div className="dsa-progress-bar-container">
                        <motion.div
                            className="dsa-progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercentage}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </header>

            <div className="dsa-controls">
                <div className="dsa-search-bar">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search problems..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="dsa-filter">
                    <select
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className="difficulty-select"
                    >
                        <option value="All">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
            </div>

            <div className="dsa-topics-list">
                {filteredTopics.map((topic) => {
                    const originalIndex = dsaTopics.findIndex(t => t.topicId === topic.topicId);
                    const topicNumber = originalIndex !== -1 ? `${originalIndex + 1}. ` : '';

                    return (
                        <div key={topic.topicId} className="dsa-topic-section">
                            <button
                                className="dsa-topic-header"
                                onClick={() => toggleTopic(topic.topicId)}
                            >
                                <h2>{topicNumber}{topic.topicName}</h2>
                                <motion.div
                                    animate={{ rotate: expandedTopics[topic.topicId] ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <KeyboardArrowDownIcon />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {expandedTopics[topic.topicId] && (
                                    <motion.div
                                        className="dsa-topic-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {topic.problems.map((prob) => {
                                            const isSolved = !!progressData[prob.id];
                                            const isSaved = !!savedProblemsData[prob.id];
                                            return (
                                                <div key={prob.id} className="dsa-problem-card">
                                                    <div className="dsa-problem-left">
                                                        <motion.button
                                                            className={`dsa-checkbox ${isSolved ? 'solved' : ''}`}
                                                            onClick={() => handleToggleProblem(prob.id)}
                                                        >
                                                            {isSolved ? (
                                                                <motion.div
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                                >
                                                                    <CheckBoxIcon className="checked-icon" />
                                                                </motion.div>
                                                            ) : (
                                                                <CheckBoxOutlineBlankIcon className="unchecked-icon" />
                                                            )}
                                                        </motion.button>
                                                        <a href={prob.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="dsa-problem-title">
                                                            {prob.title}
                                                        </a>
                                                    </div>

                                                    <div className="dsa-problem-center">
                                                        <span className={`difficulty-badge ${prob.difficulty.toLowerCase()}`}>
                                                            {prob.difficulty}
                                                        </span>
                                                    </div>

                                                    <div className="dsa-problem-right">
                                                        {prob.companies && prob.companies.map((company) => (
                                                            <CompanyLogo key={company} company={company} />
                                                        ))}
                                                        <motion.button
                                                            className={`dsa-save-btn ${isSaved ? 'saved' : ''}`}
                                                            onClick={() => handleToggleSaveProblem(prob.id)}
                                                        >
                                                            {isSaved ? <BookmarkIcon className="saved-icon" /> : <BookmarkBorderIcon className="unsaved-icon" />}
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}

                {filteredTopics.length === 0 && (
                    <div className="dsa-no-results">
                        <p>No problems found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
