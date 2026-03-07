import React, { useState, useEffect } from "react"
import { updateProfile } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase/firebase"
import '../styles/Signuppage.css' // Reusing auth styles for consistent form look
import '../styles/Profile.css' // Imported the new CSS file

export default function Profile({ user, setUser }) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isEditing, setIsEditing] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        phone: "",
        collegeName: "",
        courseBranch: "",
        semester: "",
        cgpa: "",
        certifications: "",
        internships: "",
        skills: "", // Comma separated
        interestedFields: "" // Comma separated
    })

    // Fetch existing custom data from Firestore when component mounts
    useEffect(() => {
        const fetchProfileData = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, "users", user.uid)
                    const docSnap = await getDoc(docRef)
                    if (docSnap.exists()) {
                        const data = docSnap.data()
                        setFormData(prev => ({
                            ...prev,
                            phone: data.phone || "",
                            collegeName: data.collegeName || "",
                            courseBranch: data.courseBranch || "",
                            semester: data.semester || "",
                            cgpa: data.cgpa || "",
                            certifications: data.certifications || "",
                            internships: data.internships || "",
                            skills: data.skills || "",
                            interestedFields: data.interestedFields || ""
                        }))
                    }
                } catch (error) {
                    console.error("Error fetching profile data:", error)
                }
            }
        }
        fetchProfileData()
    }, [user])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })

        try {
            // 1. Update Auth Profile (Name)
            if (formData.name !== user.displayName) {
                await updateProfile(user, { displayName: formData.name })
                if (setUser) {
                    setUser({ ...user, displayName: formData.name })
                }
            }

            // 4. Save Custom Data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: formData.name,
                phone: formData.phone,
                collegeName: formData.collegeName,
                courseBranch: formData.courseBranch,
                semester: formData.semester,
                cgpa: formData.cgpa,
                certifications: formData.certifications,
                internships: formData.internships,
                skills: formData.skills,
                interestedFields: formData.interestedFields,
                updatedAt: new Date()
            }, { merge: true }) // Merge so we don't overwrite if other fields exist

            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            setIsEditing(false) // switch back to view mode

        } catch (error) {
            console.error("Error updating profile:", error)
            setMessage({ type: 'error', text: error.message || "Failed to update profile." })
        } finally {
            setLoading(false)
        }
    }

    // Helper component for View Mode fields
    const ProfileDataField = ({ label, value, isLink }) => (
        <div className="profile-data-box">
            <label>{label}</label>
            {isLink && value ? (
                <a href={value} target="_blank" rel="noopener noreferrer" className="profile-view-link">📄 View Uploaded File</a>
            ) : (
                <div className="profile-value-display">{value || <span className="empty-val">Not provided</span>}</div>
            )}
        </div>
    );

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1 className="profile-title">Profile Settings</h1>
                <p className="profile-subtitle" style={{ marginBottom: 0 }}>
                    {isEditing ? "Update your personal information, education, and skills." : "View your saved profile information."}
                </p>
            </div>
            <div className="glass-panel profile-card">
                {message.text && (
                    <div className={`profile-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">

                        {/* Basic Info Section */}
                        <div>
                            <h3 className="profile-section-title">Basic Information</h3>
                            <div className="profile-grid-2">
                                <div className="input-field">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="input-field">
                                    <label>Email (Read Only)</label>
                                    <input type="email" value={user?.email || ""} disabled className="profile-readonly-input" />
                                </div>
                                <div className="input-field profile-full-width">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
                                </div>
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="profile-section-margin">
                            <h3 className="profile-section-title">Education</h3>
                            <div className="profile-grid-2">
                                <div className="input-field">
                                    <label>College / University Name</label>
                                    <input type="text" name="collegeName" value={formData.collegeName} onChange={handleChange} placeholder="e.g. MIT, Stanford" />
                                </div>
                                <div className="input-field">
                                    <label>Course & Branch</label>
                                    <input type="text" name="courseBranch" value={formData.courseBranch} onChange={handleChange} placeholder="e.g. B.Tech Computer Science" />
                                </div>
                                <div className="input-field">
                                    <label>Semester</label>
                                    <input type="text" name="semester" value={formData.semester} onChange={handleChange} placeholder="e.g. 6th Semester" />
                                </div>
                                <div className="input-field">
                                    <label>CGPA</label>
                                    <input type="text" name="cgpa" value={formData.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
                                </div>
                            </div>
                        </div>

                        {/* Experience & Certifications Section */}
                        <div className="profile-section-margin">
                            <h3 className="profile-section-title">Experience & Certifications</h3>
                            <div className="profile-grid-1">
                                <div className="input-field">
                                    <label>Certifications (comma separated)</label>
                                    <input type="text" name="certifications" value={formData.certifications} onChange={handleChange} placeholder="e.g. AWS Certified Solutions Architect, Coursera Deep Learning" />
                                </div>
                                <div className="input-field">
                                    <label>Internship Experience</label>
                                    <textarea name="internships" value={formData.internships} onChange={handleChange} placeholder="Describe your internship experiences..." rows="3" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc', marginTop: '0.5rem', fontFamily: 'inherit' }} />
                                </div>
                            </div>
                        </div>

                        {/* Skills & Interests Section */}
                        <div className="profile-section-margin">
                            <h3 className="profile-section-title">Skills & Interests</h3>
                            <div className="profile-grid-1">
                                <div className="input-field">
                                    <label>Your Skills (comma separated)</label>
                                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Java, Python, DSA, Web Development" />
                                    {formData.skills && (
                                        <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', color: '#555', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                            {formData.skills.split(',').filter(s => s.trim() !== '').map((skill, index) => (
                                                <li key={index}><strong>{skill.trim()}</strong></li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="input-field">
                                    <label>Interested Fields (comma separated)</label>
                                    <input type="text" name="interestedFields" value={formData.interestedFields} onChange={handleChange} placeholder="e.g. Web Development, Data Science" />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                            <button type="submit" disabled={loading} className="profile-submit-btn" style={{ flex: 1 }}>
                                {loading ? 'Saving...' : 'Save Profile Changes'}
                            </button>
                            <button type="button" onClick={() => setIsEditing(false)} className="profile-cancel-btn" style={{ padding: '0 2rem' }}>
                                Cancel
                            </button>
                        </div>

                    </form>
                ) : (
                    // VIEW MODE UI
                    <div className="profile-view-mode">
                        <h3 className="profile-section-title">Basic Information</h3>
                        <div className="profile-grid-2">
                            <ProfileDataField label="Full Name" value={formData.name} />
                            <ProfileDataField label="Email Address" value={user?.email} />
                            <ProfileDataField label="Phone Number" value={formData.phone} />
                        </div>

                        <h3 className="profile-section-title profile-section-margin">Education</h3>
                        <div className="profile-grid-2">
                            <ProfileDataField label="College / University Name" value={formData.collegeName} />
                            <ProfileDataField label="Course & Branch" value={formData.courseBranch} />
                            <ProfileDataField label="Semester" value={formData.semester} />
                            <ProfileDataField label="CGPA" value={formData.cgpa} />
                        </div>

                        <h3 className="profile-section-title profile-section-margin">Experience & Certifications</h3>
                        <div className="profile-grid-1">
                            <ProfileDataField label="Certifications" value={formData.certifications} />
                            <ProfileDataField label="Internship Experience" value={formData.internships} />
                        </div>

                        <h3 className="profile-section-title profile-section-margin">Skills & Interests</h3>
                        <div className="profile-grid-1">
                            <ProfileDataField label="Your Skills" value={formData.skills} />
                            <ProfileDataField label="Interested Fields" value={formData.interestedFields} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
                            <button onClick={() => setIsEditing(true)} className="profile-submit-btn" style={{ padding: '12px 32px' }}>
                                ✏️ Edit Profile
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}