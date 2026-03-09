import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useOutletContext } from "react-router-dom";
import "../styles/roadmap.css";

import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ROADMAP_STEPS = [
    {
        id: 1,
        title: "Self Assessment",
        description: "Analyze your aptitude, coding, and technical skills.",
        icon: AssessmentIcon,
        action: "Take Assessment"
    },
    {
        id: 2,
        title: "Learn Fundamentals",
        description: "Study programming basics, DSA, and core CS subjects.",
        icon: MenuBookIcon,
        action: "Start Learning"
    },
    {
        id: 3,
        title: "Coding Practice",
        description: "Solve coding problems and practice interview questions.",
        icon: CodeIcon,
        action: "Practice Now"
    },
    {
        id: 4,
        title: "Resume Building",
        description: "Create an ATS-friendly resume and build strong projects.",
        icon: DescriptionIcon,
        action: "Build Resume"
    },
    {
        id: 5,
        title: "Mock Interviews",
        description: "Practice technical and HR interview simulations.",
        icon: GroupsIcon,
        action: "Schedule Mock"
    },
    {
        id: 6,
        title: "Placement Ready",
        description: "Track readiness score and apply for companies.",
        icon: WorkOutlineIcon,
        action: "View Openings"
    }
];

export default function Roadmap() {
    const { user } = useOutletContext();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Hardcode completion tracking for demo purposes. 
    // In production, sync this array/number with Firestore.
    const completedSteps = [1, 2];
    const currentStep = 3;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    }
                } catch (error) {
                    console.error("Error fetching roadmap user data:", error);
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, [user]);

    if (loading) {
        return <div className="roadmap-loading">Generating your personalized roadmap...</div>;
    }

    const readinessPercentage = Math.round((completedSteps.length / ROADMAP_STEPS.length) * 100);
    const aiRecommendation = userData?.focusArea
        ? `Based on your focus in ${userData.focusArea}, we recommend solving 30 medium problems this week to prepare for ${userData.dreamCompany || 'top tech'} interviews.`
        : "Based on your progress, we recommend solving 30 medium DSA problems this week.";

    return (
        <div className="roadmap-container">
            {/* Header / Progress Bar */}
            <motion.div
                className="roadmap-header glass-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <h1 className="roadmap-title">
                        {userData?.targetRole ? `${userData.targetRole} Roadmap` : "Your Placement Roadmap"}
                    </h1>
                    <p className="roadmap-subtitle">
                        Follow this carefully structured timeline to become placement ready by {userData?.graduationYear || 'graduation'}.
                    </p>
                </div>

                <div className="progress-section">
                    <div className="progress-labels">
                        <span>Placement Readiness</span>
                        <span className="progress-percent">{readinessPercentage}%</span>
                    </div>
                    <div className="progress-track">
                        <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${readinessPercentage}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Zig-Zag Path */}
            <div className="roadmap-path-container">
                {/* Central Vertical Line drawn via CSS styling on roadmap-path-container::before */}
                <div className="roadmap-timeline-line"></div>

                {ROADMAP_STEPS.map((step, index) => {
                    const isCompleted = completedSteps.includes(step.id);
                    const isCurrent = step.id === currentStep;
                    const isLocked = !isCompleted && !isCurrent;

                    const statusClass = isCompleted ? 'completed' : isCurrent ? 'current' : 'locked';
                    const alignmentClass = index % 2 === 0 ? 'step-left' : 'step-right';
                    const IconComponent = step.icon;

                    return (
                        <motion.div
                            key={step.id}
                            className={`roadmap-step-wrapper ${alignmentClass}`}
                            initial={{ opacity: 0, x: alignmentClass === 'step-left' ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                        >
                            {/* The Marker Dot logic */}
                            <div className={`roadmap-marker ${statusClass}`}>
                                {isCompleted ? <CheckCircleIcon fontSize="small" /> : step.id}
                            </div>

                            {/* The Card */}
                            <div className={`roadmap-card glass-panel ${statusClass}`}>
                                <div className="roadmap-card-header">
                                    <div className={`roadmap-icon-circle ${statusClass}`}>
                                        <IconComponent />
                                    </div>
                                    <span className={`roadmap-status-badge ${statusClass}`}>
                                        {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Locked'}
                                    </span>
                                </div>

                                <h3 className="roadmap-card-title">Step {step.id} – {step.title}</h3>
                                <p className="roadmap-card-desc">{step.description}</p>

                                <button className={`roadmap-action-btn ${statusClass}`} disabled={isLocked}>
                                    {isLocked ? 'Locked' : step.action}
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* AI Recommendation Banner */}
            <motion.div
                className="roadmap-ai-banner glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="ai-banner-icon">✨</div>
                <div className="ai-banner-content">
                    <h4>AI Recommendation</h4>
                    <p>{aiRecommendation}</p>
                </div>
            </motion.div>
        </div>
    );
}