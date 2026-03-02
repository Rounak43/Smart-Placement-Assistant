import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../styles/DashboardHome.css';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export default function DashboardHome() {
    const { user } = useOutletContext() || {};

    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(new Date().toLocaleDateString(undefined, options));
    }, []);

    const recommendedJobs = [
        { id: 1, title: 'Software Engineering Intern', company: 'Google', location: 'Remote', salary: '$8,000/mo', type: 'Internship' },
        { id: 2, title: 'Full Stack Developer', company: 'Amazon', location: 'Seattle, WA', salary: '$120,000/yr', type: 'Full-time' },
        { id: 3, title: 'Data Analyst', company: 'Microsoft', location: 'Bangalore, India', salary: '₹12LPA', type: 'Full-time' },
    ];

    const upcomingInterviews = [
        { id: 1, company: 'Google', role: 'SWE Intern', date: 'Oct 25, 2026 - 10:00 AM', status: 'Scheduled' },
        { id: 2, company: 'Stripe', role: 'Frontend Engineer', date: 'Oct 28, 2026 - 2:00 PM', status: 'Scheduled' }
    ];

    return (
        <div className="dashboard-home-container">
            {/* Section 1: Welcome Header */}
            <header className="dash-header">
                <div className="dash-welcome">
                    <h1>Welcome back, {user?.displayName || 'Student'} 👋</h1>
                    <p>Keep applying. Your dream job is closer than you think.</p>
                </div>
                <div className="dash-date-avatar">
                    <span className="dash-date">{currentDate}</span>
                    <div className="dash-avatar">
                        {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'S'}
                    </div>
                </div>
            </header>

            {/* Section 2: Quick Stats Overview */}
            <section className="dash-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrap total">
                        <WorkOutlineIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Total Applications</h3>
                        <h2>42</h2>
                        <span className="stat-growth">+3 this week</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrap pending">
                        <HourglassEmptyIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Pending</h3>
                        <h2>18</h2>
                        <span className="stat-status">In review</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrap shortlisted">
                        <CheckCircleOutlineIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Shortlisted</h3>
                        <h2>5</h2>
                        <span className="stat-growth success">+1 recent</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrap rejected">
                        <CancelOutlinedIcon />
                    </div>
                    <div className="stat-info">
                        <h3>Rejected</h3>
                        <h2>19</h2>
                        <span className="stat-status">Keep trying</span>
                    </div>
                </div>
            </section>

            <div className="dash-main-grid">
                {/* Left Column (Main content) */}
                <div className="dash-left-col">

                    {/* Section 5: Placement Progress & Analytics */}
                    <section className="dash-section progress-section">
                        <div className="section-head">
                            <h2>Your Placement Progress</h2>
                            <TrendingUpIcon className="section-head-icon" />
                        </div>
                        <div className="progress-card">
                            <div className="progress-stats">
                                <div className="prog-stat">
                                    <span className="prog-label">Application Goal</span>
                                    <span className="prog-value">42 / 50</span>
                                </div>
                                <div className="prog-stat">
                                    <span className="prog-label">Success Rate</span>
                                    <span className="prog-value highlight">11.9%</span>
                                </div>
                            </div>
                            <div className="progress-bar-container">
                                <div className="progress-bar-fill" style={{ width: '84%' }}></div>
                            </div>
                            <p className="progress-insight">💡 You are improving your chances. Just 8 more applications to reach your weekly goal!</p>
                        </div>
                    </section>

                    {/* Section 3: Recommended Jobs */}
                    <section className="dash-section recommended-jobs">
                        <div className="section-head">
                            <h2>Recommended Jobs for You</h2>
                            <span className="tag">Based on your profile</span>
                        </div>
                        <div className="jobs-list">
                            {recommendedJobs.map(job => (
                                <div key={job.id} className="job-card">
                                    <div className="job-logo">
                                        <BusinessIcon />
                                    </div>
                                    <div className="job-main-info">
                                        <h4>{job.title}</h4>
                                        <p className="job-company">{job.company}</p>
                                        <div className="job-tags">
                                            <span className="job-tag">{job.location}</span>
                                            <span className="job-tag">{job.type}</span>
                                            <span className="job-tag highlight">{job.salary}</span>
                                        </div>
                                    </div>
                                    <div className="job-actions">
                                        <button className="icon-btn" title="Bookmark"><BookmarkBorderIcon /></button>
                                        <button className="apply-btn">Apply Now</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column (Sidebar content) */}
                <div className="dash-right-col">

                    {/* Section 6: Quick Actions Panel */}
                    <section className="dash-section quick-actions">
                        <h2>Quick Actions</h2>
                        <div className="actions-grid">
                            <button className="action-btn">
                                <AddCircleOutlineIcon />
                                <span>Apply to New</span>
                            </button>
                            <button className="action-btn">
                                <UploadFileIcon />
                                <span>Upload Resume</span>
                            </button>
                            <button className="action-btn">
                                <EditIcon />
                                <span>Update Profile</span>
                            </button>
                            <button className="action-btn">
                                <VisibilityIcon />
                                <span>View Applications</span>
                            </button>
                        </div>
                    </section>

                    {/* Section 4: Upcoming Interviews */}
                    <section className="dash-section upcoming-interviews">
                        <h2>Upcoming Interviews</h2>
                        <div className="interview-list">
                            {upcomingInterviews.length > 0 ? (
                                upcomingInterviews.map(interview => (
                                    <div key={interview.id} className="interview-card">
                                        <div className="int-details">
                                            <h4>{interview.company}</h4>
                                            <p className="int-role">{interview.role}</p>
                                            <p className="int-date">{interview.date}</p>
                                        </div>
                                        <div className="int-status">
                                            <span className={`status-badge ${interview.status.toLowerCase()}`}>{interview.status}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-state">
                                    <p>No upcoming interviews. Keep applying!</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
