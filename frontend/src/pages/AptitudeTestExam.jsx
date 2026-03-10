import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AptitudeTestExam.css';

// ─── Question Bank ────────────────────────────────────────────────────────────
const allQuestions = {
    Quantitative: [
        { q: 'If 20% of a number is 50, what is the number?', opts: ['150', '200', '250', '300'], ans: 2, diff: 'Easy' },
        { q: 'A train travels 360 km in 4 hours. What is its speed in km/hr?', opts: ['80', '90', '95', '100'], ans: 1, diff: 'Easy' },
        { q: 'Find the LCM of 12 and 18.', opts: ['24', '36', '48', '72'], ans: 1, diff: 'Easy' },
        { q: 'The ratio of two numbers is 3:5. Their sum is 96. Find the larger number.', opts: ['36', '48', '60', '72'], ans: 2, diff: 'Medium' },
        { q: 'A shopkeeper sells a product at a 25% profit. If the cost price is ₹400, what is the selling price?', opts: ['₹450', '₹480', '₹500', '₹520'], ans: 2, diff: 'Easy' },
        { q: 'The simple interest on ₹5000 for 3 years at 8% per annum is?', opts: ['₹1000', '₹1200', '₹1500', '₹1800'], ans: 1, diff: 'Medium' },
        { q: 'If a pipe can fill a tank in 12 hours and another can drain it in 18 hours, in how many hours will the tank be full if both are open?', opts: ['24', '30', '36', '48'], ans: 2, diff: 'Medium' },
        { q: 'What is the compound interest on ₹8000 at 10% per annum for 2 years?', opts: ['₹1600', '₹1680', '₹1700', '₹1760'], ans: 1, diff: 'Hard' },
        { q: 'A boat goes 30 km downstream in 2 hours and 20 km upstream in 4 hours. Speed of the stream?', opts: ['2.5 km/h', '3 km/h', '4 km/h', '5 km/h'], ans: 0, diff: 'Hard' },
        { q: 'If 6 men can do a job in 10 days, how many men are needed to complete it in 4 days?', opts: ['12', '15', '18', '20'], ans: 1, diff: 'Hard' },
    ],
    Logical: [
        { q: 'If all cats are dogs and all dogs are birds, are all cats birds?', opts: ['Yes', 'No', 'Cannot be determined', 'Partially'], ans: 0, diff: 'Easy' },
        { q: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', opts: ['40', '42', '44', '46'], ans: 1, diff: 'Easy' },
        { q: 'A is the father of B. B is the sister of C. How is A related to C?', opts: ['Uncle', 'Father', 'Grandfather', 'Brother'], ans: 1, diff: 'Easy' },
        { q: 'If APPLE is coded as BQQMF, how is MANGO coded?', opts: ['NBOHP', 'NAOHO', 'MBMHP', 'NBOIP'], ans: 0, diff: 'Medium' },
        { q: 'Pointing to a lady, Ravi said "Her mother is the only daughter of my mother." How is Ravi related to the lady?', opts: ['Father', 'Brother', 'Uncle', 'Son'], ans: 0, diff: 'Medium' },
        { q: 'Five friends A, B, C, D, E are sitting in a row. B is to the right of D but left of C. A is at one end. E is to the left of B. Who is in the middle?', opts: ['B', 'C', 'D', 'E'], ans: 1, diff: 'Medium' },
        { q: 'What comes next: WXY, ABC, DEF, GHI, ?', opts: ['JKL', 'KLM', 'MNO', 'LMN'], ans: 0, diff: 'Easy' },
        { q: 'A clock shows 3:45 PM. What angle does the minute hand make with the 12?', opts: ['270°', '282.5°', '292.5°', '315°'], ans: 0, diff: 'Hard' },
        { q: 'If in a certain language, "go run jump" = 3 7 9 and "jump fast" = 9 4, what is the code for "jump"?', opts: ['3', '4', '7', '9'], ans: 3, diff: 'Hard' },
        { q: 'Three boxes weigh 10 kg, 20 kg, and 30 kg. In how many ways can they be arranged so that the heaviest is never first?', opts: ['2', '4', '6', '8'], ans: 3, diff: 'Hard' },
    ],
    Verbal: [
        { q: 'Choose the word most similar in meaning to "Benevolent":', opts: ['Cruel', 'Kind', 'Selfish', 'Strict'], ans: 1, diff: 'Easy' },
        { q: 'Identify the correct sentence:', opts: ['She don\'t know him', 'She didn\'t knew him', 'She doesn\'t know him', 'She not know him'], ans: 2, diff: 'Easy' },
        { q: 'Choose the antonym of "Verbose":', opts: ['Wordy', 'Lengthy', 'Talkative', 'Concise'], ans: 3, diff: 'Easy' },
        { q: 'Fill in the blank: He was known for his _____ speeches that captivated audiences.', opts: ['monotonous', 'eloquent', 'incoherent', 'vague'], ans: 1, diff: 'Medium' },
        { q: 'Rearrange: "meeting / to / arrived / they / the / early" to form a sentence.', opts: ['They arrived early to the meeting', 'They meeting early arrived the to', 'Early they the to meeting arrived', 'To the early they arrived meeting'], ans: 0, diff: 'Medium' },
        { q: 'Identify the error: "Neither the teacher nor the students was present."', opts: ['Neither the teacher', 'nor the students', 'was present', 'No error'], ans: 2, diff: 'Medium' },
        { q: 'Choose the correctly spelled word:', opts: ['Accomodate', 'Accommodate', 'Acommodate', 'Accomodate'], ans: 1, diff: 'Easy' },
        { q: 'The passage implies that advances in AI will most likely: (Context: AI is transforming industries by automating routine tasks, freeing humans for creative roles.)', opts: ['Replace all jobs', 'Create new job roles', 'Reduce human creativity', 'Limit technological growth'], ans: 1, diff: 'Hard' },
        { q: 'Choose the correct preposition: "She has been working _____ 9 AM."', opts: ['since', 'from', 'for', 'at'], ans: 0, diff: 'Medium' },
        { q: '"Better late than never" means:', opts: ['Always be punctual', 'Do things quickly', 'Doing something late is better than not doing it', 'Avoid delays at all costs'], ans: 2, diff: 'Hard' },
    ],
    'Data Interpretation': [
        { q: 'A pie chart shows 30% for Sales. If total revenue = ₹5,00,000, the sales revenue is?', opts: ['₹1,00,000', '₹1,50,000', '₹2,00,000', '₹2,50,000'], ans: 1, diff: 'Easy' },
        { q: 'Bar chart: Product A sold 200 units, Product B sold 150. What is the ratio of A to B sales?', opts: ['3:2', '4:3', '2:1', '5:4'], ans: 1, diff: 'Easy' },
        { q: 'If January sales = 100 and February = 130, what is the percentage increase?', opts: ['25%', '30%', '33%', '35%'], ans: 1, diff: 'Easy' },
        { q: 'A table shows 5 students with marks: 60, 70, 80, 90, 50. What is the average?', opts: ['68', '70', '72', '75'], ans: 1, diff: 'Easy' },
        { q: 'In a bar chart, City A has 3000 population and City B has 4500. What % more is City B than City A?', opts: ['33.3%', '40%', '50%', '66.7%'], ans: 2, diff: 'Medium' },
        { q: 'From a table: exports in 2020 = ₹200 cr, 2021 = ₹260 cr. Growth rate?', opts: ['20%', '25%', '30%', '35%'], ans: 2, diff: 'Medium' },
        { q: 'A line graph shows sales: Jan=500, Feb=450, Mar=600. Average for 3 months?', opts: ['500', '510', '516.7', '530'], ans: 2, diff: 'Medium' },
        { q: 'Company revenue Q1=₹100Cr, Q2=₹120Cr, Q3=₹80Cr, Q4=₹100Cr. Q2 share of annual revenue?', opts: ['25%', '30%', '35%', '40%'], ans: 1, diff: 'Hard' },
        { q: 'If the male-female ratio in a company is 3:2 and total = 500, how many females?', opts: ['150', '175', '200', '250'], ans: 2, diff: 'Medium' },
        { q: 'From a table: Product X profit margin is 18% on revenue ₹50 lakh. Profit?', opts: ['₹7 lakh', '₹8 lakh', '₹9 lakh', '₹10 lakh'], ans: 2, diff: 'Hard' },
    ],
};

const SECTION_NAMES = Object.keys(allQuestions);
const TOTAL_QUESTIONS = SECTION_NAMES.length * 10;
const TOTAL_TIME = 40 * 60; // 40 minutes in seconds

function flattenQuestions() {
    const flat = [];
    SECTION_NAMES.forEach(section => {
        allQuestions[section].forEach((q, idx) => {
            flat.push({ ...q, section, localIndex: idx, globalIndex: flat.length });
        });
    });
    return flat;
}

const questions = flattenQuestions();

function buildInitialAnswers() {
    return Array(TOTAL_QUESTIONS).fill(null);
}

export default function AptitudeTestExam() {
    const navigate = useNavigate();

    const [answers, setAnswers] = useState(buildInitialAnswers);
    const [marked, setMarked] = useState(Array(TOTAL_QUESTIONS).fill(false));
    const [activeSection, setActiveSection] = useState(0);
    const [currentQ, setCurrentQ] = useState(0); // global index
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);

    // Timer
    const handleSubmit = useCallback(() => {
        const sectionScores = {};
        SECTION_NAMES.forEach(s => { sectionScores[s] = { correct: 0, total: 10, attempted: 0 }; });

        let totalCorrect = 0;
        questions.forEach(q => {
            const userAns = answers[q.globalIndex];
            if (userAns !== null) {
                sectionScores[q.section].attempted++;
                if (userAns === q.ans) {
                    sectionScores[q.section].correct++;
                    totalCorrect++;
                }
            }
        });

        const attempted = answers.filter(a => a !== null).length;
        setResults({
            totalCorrect,
            attempted,
            accuracy: attempted > 0 ? Math.round((totalCorrect / attempted) * 100) : 0,
            overallPercent: Math.round((totalCorrect / TOTAL_QUESTIONS) * 100),
            sectionScores
        });
        setSubmitted(true);
    }, [answers]);

    useEffect(() => {
        if (submitted) return;
        if (timeLeft <= 0) { handleSubmit(); return; }
        const tid = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(tid);
    }, [timeLeft, submitted, handleSubmit]);

    // Computed section info
    const sectionStart = activeSection * 10;
    const sectionQuestions = questions.slice(sectionStart, sectionStart + 10);

    const formatTime = (secs) => {
        const m = Math.floor(secs / 60).toString().padStart(2, '0');
        const s = (secs % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const getQuestionStatus = (globalIdx) => {
        if (marked[globalIdx]) return 'marked';
        if (answers[globalIdx] !== null) return 'answered';
        return 'unattempted';
    };

    const selectOption = (opt) => {
        const updated = [...answers];
        updated[currentQ] = opt;
        setAnswers(updated);
    };

    const toggleMark = () => {
        const updated = [...marked];
        updated[currentQ] = !updated[currentQ];
        setMarked(updated);
    };

    const goToQuestion = (globalIdx) => {
        const secIdx = Math.floor(globalIdx / 10);
        setActiveSection(secIdx);
        setCurrentQ(globalIdx);
    };

    const goNext = () => {
        if (currentQ < TOTAL_QUESTIONS - 1) {
            const next = currentQ + 1;
            setCurrentQ(next);
            setActiveSection(Math.floor(next / 10));
        }
    };

    const goPrev = () => {
        if (currentQ > 0) {
            const prev = currentQ - 1;
            setCurrentQ(prev);
            setActiveSection(Math.floor(prev / 10));
        }
    };

    const timerDanger = timeLeft < 300;

    const q = questions[currentQ];

    // ─── RESULTS SCREEN ──────────────────────────────────────────────────────
    if (submitted && results) {
        return (
            <div className="exam-results-page">
                <div className="exam-results-card">
                    <div className="results-header">
                        <div className="results-trophy">🏆</div>
                        <h1>Test Completed!</h1>
                        <p>Here's a detailed breakdown of your performance</p>
                    </div>

                    <div className="results-summary-row">
                        <div className="res-stat-card">
                            <div className="res-stat-val" style={{ color: '#60A5FA' }}>{results.totalCorrect}<span>/{TOTAL_QUESTIONS}</span></div>
                            <div className="res-stat-label">Score</div>
                        </div>
                        <div className="res-stat-card">
                            <div className="res-stat-val" style={{ color: '#34D399' }}>{results.accuracy}%</div>
                            <div className="res-stat-label">Accuracy</div>
                        </div>
                        <div className="res-stat-card">
                            <div className="res-stat-val" style={{ color: '#FBBF24' }}>{results.attempted}</div>
                            <div className="res-stat-label">Attempted</div>
                        </div>
                        <div className="res-stat-card">
                            <div className="res-stat-val" style={{ color: '#A78BFA' }}>{results.overallPercent}%</div>
                            <div className="res-stat-label">Percentile est.</div>
                        </div>
                    </div>

                    <h3 className="section-breakdown-title">Section-wise Performance</h3>
                    <div className="section-breakdown-grid">
                        {SECTION_NAMES.map(sec => {
                            const s = results.sectionScores[sec];
                            const pct = Math.round((s.correct / s.total) * 100);
                            return (
                                <div key={sec} className="sec-breakdown-card">
                                    <div className="sec-breakdown-header">
                                        <span className="sec-icon">
                                            {sec === 'Quantitative' ? '🧮' : sec === 'Logical' ? '🧠' : sec === 'Verbal' ? '📖' : '📊'}
                                        </span>
                                        <span className="sec-name">{sec}</span>
                                    </div>
                                    <div className="sec-score">{s.correct}/{s.total}</div>
                                    <div className="sec-bar-wrapper">
                                        <div
                                            className="sec-bar-fill"
                                            style={{
                                                width: `${pct}%`,
                                                background: pct >= 70 ? '#34D399' : pct >= 40 ? '#FBBF24' : '#EF4444'
                                            }}
                                        />
                                    </div>
                                    <div className="sec-pct">{pct}%</div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="results-actions">
                        <button className="res-btn secondary" onClick={() => { setSubmitted(false); setAnswers(buildInitialAnswers()); setMarked(Array(TOTAL_QUESTIONS).fill(false)); setTimeLeft(TOTAL_TIME); setCurrentQ(0); setActiveSection(0); }}>
                            Retake Test
                        </button>
                        <button className="res-btn primary" onClick={() => navigate('/dashboard/aptitude')}>
                            Back to Aptitude Prep
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── EXAM INTERFACE ───────────────────────────────────────────────────────
    return (
        <div className="exam-wrapper">
            {/* Top Bar */}
            <div className="exam-topbar">
                <div className="exam-topbar-left">
                    <span className="exam-logo">🎓</span>
                    <span className="exam-brand">Smart Placement — Aptitude Test</span>
                </div>
                <div className={`exam-timer ${timerDanger ? 'timer-danger' : ''}`}>
                    <span className="timer-icon">⏱</span>
                    <span className="timer-val">{formatTime(timeLeft)}</span>
                </div>
            </div>

            {/* Section Tabs */}
            <div className="exam-section-tabs">
                {SECTION_NAMES.map((sec, idx) => (
                    <button
                        key={sec}
                        className={`sec-tab ${activeSection === idx ? 'active' : ''}`}
                        onClick={() => { setActiveSection(idx); setCurrentQ(idx * 10); }}
                    >
                        <span className="sec-tab-icon">
                            {sec === 'Quantitative' ? '🧮' : sec === 'Logical' ? '🧠' : sec === 'Verbal' ? '📖' : '📊'}
                        </span>
                        <span>{sec}</span>
                        <span className="sec-tab-count">
                            {answers.slice(idx * 10, idx * 10 + 10).filter(a => a !== null).length}/10
                        </span>
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div className="exam-main">
                {/* Question Panel */}
                <div className="exam-question-panel">
                    <div className="question-meta">
                        <span className="q-number">Q{q.localIndex + 1} of 10</span>
                        <span className={`q-diff-badge diff-${q.diff.toLowerCase()}`}>{q.diff}</span>
                        {marked[currentQ] && <span className="q-marked-tag">🔖 Marked for Review</span>}
                    </div>

                    <div className="question-text">
                        {q.q}
                    </div>

                    <div className="options-list">
                        {q.opts.map((opt, i) => (
                            <label
                                key={i}
                                className={`option-row ${answers[currentQ] === i ? 'selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name={`q-${currentQ}`}
                                    checked={answers[currentQ] === i}
                                    onChange={() => selectOption(i)}
                                />
                                <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                                <span className="option-text">{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div className="exam-nav-buttons">
                        <button className="nav-btn prev" onClick={goPrev} disabled={currentQ === 0}>
                            ← Previous
                        </button>
                        <button
                            className={`nav-btn mark ${marked[currentQ] ? 'marked' : ''}`}
                            onClick={toggleMark}
                        >
                            🔖 {marked[currentQ] ? 'Unmark' : 'Mark for Review'}
                        </button>
                        <button className="nav-btn next" onClick={goNext} disabled={currentQ === TOTAL_QUESTIONS - 1}>
                            Next →
                        </button>
                    </div>
                </div>

                {/* Right Panel: Question Palette */}
                <div className="exam-palette-panel">
                    <div className="palette-header">Question Palette</div>

                    <div className="palette-legend">
                        <span className="legend-item"><span className="legend-dot answered" />Answered</span>
                        <span className="legend-item"><span className="legend-dot marked" />Marked</span>
                        <span className="legend-item"><span className="legend-dot unattempted" />Not Attempted</span>
                    </div>

                    <div className="palette-section-label">
                        {SECTION_NAMES[activeSection]}
                    </div>
                    <div className="palette-grid">
                        {sectionQuestions.map((sq) => (
                            <button
                                key={sq.globalIndex}
                                className={`palette-btn ${getQuestionStatus(sq.globalIndex)} ${sq.globalIndex === currentQ ? 'current' : ''}`}
                                onClick={() => goToQuestion(sq.globalIndex)}
                            >
                                {sq.localIndex + 1}
                            </button>
                        ))}
                    </div>

                    <div className="palette-progress">
                        <div className="progress-text">
                            <span>{answers.filter(a => a !== null).length} / {TOTAL_QUESTIONS} Answered</span>
                        </div>
                        <div className="progress-bar-wrap">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${(answers.filter(a => a !== null).length / TOTAL_QUESTIONS) * 100}%` }}
                            />
                        </div>
                    </div>

                    <button className="submit-exam-btn" onClick={handleSubmit}>
                        Submit Test
                    </button>
                </div>
            </div>
        </div>
    );
}
