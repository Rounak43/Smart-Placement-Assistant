import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/QuizModal.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function QuizModal({ isOpen, onClose, stepData, onComplete }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Reset state when modal opens with new data
    useEffect(() => {
        if (isOpen) {
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setScore(0);
            setShowResult(false);
        }
    }, [isOpen, stepData]);

    if (!isOpen || !stepData) return null;

    const currentQuestion = stepData.questions[currentQuestionIndex];

    const handleNext = () => {
        // Evaluate answer
        if (selectedOption === currentQuestion.answerIndex) {
            setScore(prev => prev + 1);
        }

        if (currentQuestionIndex < stepData.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
        } else {
            // Reached the end
            setShowResult(true);
            // Immediately calculate final score to pass to parent
            const finalScore = selectedOption === currentQuestion.answerIndex ? score + 1 : score;
            const total = stepData.questions.length;
            const isPassed = (finalScore / total) >= 0.5;

            // Wait slightly before showing result logic, but tell parent immediately if needed, 
            // actually we let the user click "Finish" to send to parent.
        }
    };

    const handleFinish = () => {
        const finalScore = selectedOption === currentQuestion.answerIndex ? score + 1 : score;
        onComplete(stepData.id, finalScore, stepData.questions.length);
    };

    const totalQuestions = stepData.questions.length;
    // Calculate display score (only valid when showResult is true)
    const finalScoreToDisplay = selectedOption === currentQuestion.answerIndex ? score + 1 : score;
    const isPassed = (finalScoreToDisplay / totalQuestions) >= 0.5;

    return (
        <AnimatePresence>
            <motion.div
                className="quiz-modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                    if (e.target.classList.contains('quiz-modal-overlay')) onClose();
                }}
            >
                <motion.div
                    className="quiz-modal"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                >
                    <button className="quiz-close-btn" onClick={onClose}>&times;</button>

                    <div className="quiz-content-wrapper">
                        {!showResult ? (
                            <>
                                <div className="quiz-header">
                                    <h2>Step {stepData.id} Quiz</h2>
                                    <p>{stepData.title}</p>
                                </div>

                                <div className="quiz-progress">
                                    Question {currentQuestionIndex + 1} of {totalQuestions}
                                </div>

                                <div className="quiz-question-container">
                                    <h3>{currentQuestion.question}</h3>
                                    <div className="quiz-options">
                                        {currentQuestion.options.map((opt, idx) => (
                                            <button
                                                key={idx}
                                                className={`quiz-option-btn ${selectedOption === idx ? 'selected' : ''}`}
                                                onClick={() => setSelectedOption(idx)}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="quiz-action-btn"
                                    onClick={handleNext}
                                    disabled={selectedOption === null}
                                >
                                    {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Quiz'}
                                </button>
                            </>
                        ) : (
                            <div className="quiz-result-container">
                                {isPassed ? (
                                    <CheckCircleOutlineIcon className="quiz-result-icon success" />
                                ) : (
                                    <CancelOutlinedIcon className="quiz-result-icon fail" />
                                )}

                                <h3>{isPassed ? 'Congratulations!' : 'Keep Practicing'}</h3>

                                <div className="quiz-score-display">
                                    You scored <span>{finalScoreToDisplay}</span> out of {totalQuestions}
                                </div>

                                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                                    {isPassed
                                        ? `Great job! You scored above 50% and unlocked the next step.`
                                        : `You need at least 50% to unlock the next step. Please try again.`}
                                </p>

                                <button className="quiz-action-btn" onClick={handleFinish}>
                                    {isPassed ? 'Continue Roadmap' : 'Back to Roadmap'}
                                </button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
