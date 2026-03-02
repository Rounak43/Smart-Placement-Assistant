import React, { useState } from 'react';
import '../styles/Jobs.css';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';

export default function Jobs() {
    // Mock Data for Jobs
    const allJobs = [
        {
            id: 1,
            title: "Frontend Developer Intern",
            company: "Google",
            location: "Remote",
            type: "Internship",
            salary: "$8k/month",
            skills: ["React", "JavaScript", "CSS"],
            preview: "Join our core UI team to build scalable interfaces for millions of users.",
            description: "We are looking for a passionate Frontend Developer Intern. You will be working directly with our UI/UX designers and senior engineers to implement pixel-perfect, responsive designs.",
            responsibilities: [
                "Develop new user-facing features using React.js",
                "Build reusable code and libraries for future use",
                "Ensure the technical feasibility of UI/UX designs",
                "Optimize application for maximum speed and scalability"
            ],
            eligibility: "Currently pursuing BS/MS in Computer Science or related field.",
            lastDate: "Nov 15, 2026",
            recommended: true
        },
        {
            id: 2,
            title: "Software Development Engineer I",
            company: "Amazon",
            location: "Seattle, WA",
            type: "Full-Time",
            salary: "$120k/year",
            skills: ["Java", "AWS", "Spring Boot"],
            preview: "Help us build the next generation of logistics and supply chain software.",
            description: "As an SDE I at Amazon, you will design, develop, and deploy highly scalable backend services.",
            responsibilities: [
                "Design and build scalable microservices",
                "Write clean, maintainable, and well-tested code",
                "Participate in code reviews and architecture discussions"
            ],
            eligibility: "Bachelor's degree in Computer Science, 0-2 years of experience.",
            lastDate: "Dec 01, 2026",
            recommended: true
        },
        {
            id: 3,
            title: "Data Analyst Fresher",
            company: "Microsoft",
            location: "Bangalore, India",
            type: "Full-Time",
            salary: "₹12 LPA",
            skills: ["Python", "SQL", "PowerBI"],
            preview: "Analyze telemetry data to drive key business decisions for Office 365.",
            description: "Join our data science team to uncover patterns and create actionable metrics from big data architectures.",
            responsibilities: [
                "Query large datasets using SQL",
                "Build dashboards in PowerBI",
                "Present findings to stakeholders"
            ],
            eligibility: "Recent graduate with strong analytical skills.",
            lastDate: "Oct 30, 2026",
            recommended: false
        },
        {
            id: 4,
            title: "UI/UX Design Intern",
            company: "Figma",
            location: "Remote",
            type: "Internship",
            salary: "$5k/month",
            skills: ["Figma", "Prototyping", "User Research"],
            preview: "Shape the future of collaborative design tools with our product team.",
            description: "Work directly on Figma's core editor, creating seamless workflows for designers worldwide.",
            responsibilities: [
                "Conduct user research",
                "Create wireframes and interactive prototypes",
                "Collaborate with engineering for handoff"
            ],
            eligibility: "Portfolio demonstrating clear design thinking.",
            lastDate: "Nov 10, 2026",
            recommended: false
        }
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [savedJobs, setSavedJobs] = useState(new Set());
    const [appliedJobs, setAppliedJobs] = useState(new Set());
    const [selectedJob, setSelectedJob] = useState(null);

    const toggleSave = (id, e) => {
        e.stopPropagation();
        setSavedJobs(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleApply = (id, e) => {
        if (e) e.stopPropagation();
        setAppliedJobs(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
        alert("Application Submitted Successfully!"); // Simple alert per requirement
    };

    const JobCard = ({ job }) => (
        <div className="job-card">
            <div className="job-card-header">
                <div className="job-logo-title">
                    <div className="job-logo">
                        <BusinessIcon />
                    </div>
                    <div className="job-title-info">
                        <h3>{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                        <div className="job-location">
                            <LocationOnOutlinedIcon /> {job.location}
                        </div>
                    </div>
                </div>
                <button className="bookmark-btn" onClick={(e) => toggleSave(job.id, e)} title={savedJobs.has(job.id) ? "Unsave" : "Save"}>
                    {savedJobs.has(job.id) ? <BookmarkOutlinedIcon style={{ color: '#3b82f6' }} /> : <BookmarkBorderOutlinedIcon />}
                </button>
            </div>

            <div className="job-badges">
                <span className="job-badge type">{job.type}</span>
                <span className="job-badge salary">{job.salary}</span>
            </div>

            <div className="job-skills">
                {job.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                ))}
            </div>

            <p className="job-preview">{job.preview}</p>

            <div className="job-card-actions">
                <button
                    className="btn-primary"
                    onClick={(e) => handleApply(job.id, e)}
                    disabled={appliedJobs.has(job.id)}
                >
                    {appliedJobs.has(job.id) ? "Applied ✓" : "Apply Now"}
                </button>
                <button className="btn-secondary" onClick={() => setSelectedJob(job)}>
                    View Details
                </button>
            </div>
        </div>
    );

    return (
        <div className="jobs-container">
            <div className="jobs-header">
                <h1>Job Opportunities</h1>
                <p>Find internships and full-time roles tailored for you</p>
            </div>

            {/* Section 1: Search & Filter Bar */}
            <div className="search-filter-bar">
                <div className="search-input-wrap">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search by role, skill, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="filter-select">
                    <option value="">Location</option>
                    <option value="remote">Remote</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                </select>
                <select className="filter-select">
                    <option value="">Job Type</option>
                    <option value="internship">Internship</option>
                    <option value="full-time">Full-Time</option>
                </select>
                <select className="filter-select">
                    <option value="">Experience</option>
                    <option value="fresher">Fresher (0 yrs)</option>
                    <option value="1-3">1-3 yrs</option>
                </select>
                <button className="search-btn">Search</button>
            </div>

            {/* Section 2: Recommended Jobs */}
            <div className="recommended-section">
                <h2 className="section-title">Recommended for You</h2>
                <p className="section-subtitle">Based on your profile and skills</p>
                <div className="jobs-grid">
                    {allJobs.filter(j => j.recommended).map(job => (
                        <JobCard key={`rec-${job.id}`} job={job} />
                    ))}
                </div>
            </div>

            {/* Section 3: All Job Listings */}
            <div className="all-jobs-section">
                <h2 className="section-title">All Available Jobs</h2>
                <div className="jobs-grid" style={{ marginTop: '20px' }}>
                    {allJobs.map(job => (
                        <JobCard key={`all-${job.id}`} job={job} />
                    ))}
                </div>
            </div>

            {/* Section 4: Modal Detail View */}
            {selectedJob && (
                <div className="job-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedJob(null) }}>
                    <div className="job-modal-content">
                        <div className="modal-header">
                            <div className="modal-header-info">
                                <div className="job-logo">
                                    <BusinessIcon fontSize="large" />
                                </div>
                                <div className="job-title-info">
                                    <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: 'var(--text-primary)' }}>{selectedJob.title}</h2>
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500' }}>{selectedJob.company}</h4>
                                    <div className="job-location" style={{ fontSize: '14px' }}>
                                        <LocationOnOutlinedIcon fontSize="small" /> {selectedJob.location}
                                        <span style={{ margin: '0 8px' }}>•</span>
                                        {selectedJob.type}
                                        <span style={{ margin: '0 8px' }}>•</span>
                                        {selectedJob.salary}
                                    </div>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedJob(null)}>
                                <CloseIcon />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="modal-section">
                                <h4>Job Description</h4>
                                <p>{selectedJob.description}</p>
                            </div>

                            <div className="modal-section">
                                <h4>Key Responsibilities</h4>
                                <ul>
                                    {selectedJob.responsibilities.map((req, i) => (
                                        <li key={i}>{req}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="modal-section">
                                <h4>Required Skills</h4>
                                <div className="job-skills">
                                    {selectedJob.skills.map(skill => (
                                        <span key={skill} className="skill-tag">{skill}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-section">
                                <h4>Eligibility & Timeline</h4>
                                <p><strong>Eligibility:</strong> {selectedJob.eligibility}</p>
                                <p><strong>Apply Before:</strong> {selectedJob.lastDate}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn-secondary" onClick={() => setSelectedJob(null)}>Close</button>
                            <button
                                className="btn-primary"
                                onClick={() => handleApply(selectedJob.id)}
                                disabled={appliedJobs.has(selectedJob.id)}
                            >
                                {appliedJobs.has(selectedJob.id) ? "Applied ✓" : "Apply Now"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
