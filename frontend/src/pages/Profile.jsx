import React, { useState, useEffect } from "react"
import { updateProfile, updatePassword } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { auth, db, storage } from "../firebase/firebase"
import '../styles/Signuppage.css' // Reusing auth styles for consistent form look
import '../styles/Profile.css' // Imported the new CSS file

export default function Profile({ user }) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })

    // File Upload State
    const [resumeFile, setResumeFile] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    // Form State
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        newPassword: "",
        collegeName: "",
        courseBranch: "",
        skills: "", // Comma separated
        interestedFields: "", // Comma separated
        skillRating: "0", // 0 to 5
        resumeUrl: "" // URL to the uploaded resume
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
                            collegeName: data.collegeName || "",
                            courseBranch: data.courseBranch || "",
                            skills: data.skills || "",
                            interestedFields: data.interestedFields || "",
                            skillRating: data.skillRating || "0",
                            resumeUrl: data.resumeUrl || ""
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

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setResumeFile(e.target.files[0])
        }
    }

    const uploadResume = async () => {
        if (!resumeFile) return formData.resumeUrl; // Return existing if no new file

        return new Promise((resolve, reject) => {
            const fileRef = ref(storage, `resumes/${user.uid}/${resumeFile.name}`);
            const uploadTask = uploadBytesResumable(fileRef, resumeFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                (error) => {
                    console.error("Upload failed:", error);
                    reject(error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                }
            );
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ type: '', text: '' })
        setUploadProgress(0)

        try {
            // 1. Update Auth Profile (Name)
            if (formData.name !== user.displayName) {
                await updateProfile(user, { displayName: formData.name })
            }

            // 2. Update Auth Password (if provided)
            if (formData.newPassword) {
                await updatePassword(user, formData.newPassword)
            }

            // 3. Handle Resume Upload (If a new file is attached)
            let currentResumeUrl = formData.resumeUrl;
            if (resumeFile) {
                currentResumeUrl = await uploadResume();
            }

            // 4. Save Custom Data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: formData.name,
                collegeName: formData.collegeName,
                courseBranch: formData.courseBranch,
                skills: formData.skills,
                interestedFields: formData.interestedFields,
                skillRating: formData.skillRating,
                resumeUrl: currentResumeUrl, // Include the URL here
                updatedAt: new Date()
            }, { merge: true }) // Merge so we don't overwrite if other fields exist

            setMessage({ type: 'success', text: 'Profile updated successfully!' })
            setFormData(prev => ({ ...prev, newPassword: "", resumeUrl: currentResumeUrl })) // update state
            setResumeFile(null) // clear file input
            setUploadProgress(0) // reset progress

        } catch (error) {
            console.error("Error updating profile:", error)
            setMessage({ type: 'error', text: error.message || "Failed to update profile." })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="profile-container">
            <h1 className="profile-title">Profile Settings</h1>
            <p className="profile-subtitle">
                Update your personal information, education, and skills.
            </p>

            <div className="glass-panel profile-card">
                {message.text && (
                    <div className={`profile-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

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
                                <label>New Password (leave blank to keep current)</label>
                                <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} placeholder="Enter new password to change" />
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
                        </div>
                    </div>

                    {/* Skills & Interests Section */}
                    <div className="profile-section-margin">
                        <h3 className="profile-section-title">Skills & Interests</h3>
                        <div className="profile-grid-1">
                            <div className="input-field">
                                <label>Your Skills (comma separated)</label>
                                <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. React, Python, Machine Learning" />
                            </div>
                            <div className="input-field">
                                <label>Interested Fields (comma separated)</label>
                                <input type="text" name="interestedFields" value={formData.interestedFields} onChange={handleChange} placeholder="e.g. Web Development, Data Science" />
                            </div>

                            <div className="input-field">
                                <label>Self-Rate Your Overall Skill Level (0 to 5)</label>
                                <div className="profile-rating-slider-container">
                                    <input
                                        type="range"
                                        name="skillRating"
                                        min="0" max="5" step="0.5"
                                        value={formData.skillRating}
                                        onChange={handleChange}
                                        className="profile-rating-slider"
                                    />
                                    <span className="profile-rating-value">
                                        {formData.skillRating} / 5
                                    </span>
                                </div>
                            </div>

                            {/* Resume Upload Section */}
                            <div className="input-field profile-section-margin">
                                <label>Upload Resume (PDF preferred)</label>

                                {formData.resumeUrl && !resumeFile && (
                                    <div className="profile-resume-container">
                                        <div className="profile-resume-link-wrap">
                                            <span className="profile-resume-icon">📄</span>
                                            <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" className="profile-resume-link">
                                                View Uploaded Resume
                                            </a>
                                        </div>
                                        <span
                                            onClick={async () => {
                                                if (window.confirm("Are you sure you want to remove your resume?")) {
                                                    setLoading(true);
                                                    setMessage({ type: '', text: '' });
                                                    try {
                                                        await setDoc(doc(db, "users", user.uid), {
                                                            resumeUrl: ""
                                                        }, { merge: true });

                                                        setFormData(prev => ({ ...prev, resumeUrl: "" }));
                                                        setMessage({ type: 'success', text: 'Resume removed successfully!' });
                                                    } catch (error) {
                                                        console.error("Error removing resume:", error);
                                                        setMessage({ type: 'error', text: 'Failed to remove resume.' });
                                                    } finally {
                                                        setLoading(false);
                                                    }
                                                }
                                            }}
                                            className="profile-resume-remove"
                                            title="Remove Resume"
                                        >
                                            ✕ Remove
                                        </span>
                                    </div>
                                )}

                                <div className="profile-resume-input-wrap">
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="profile-resume-input"
                                    />
                                    {resumeFile && (
                                        <button
                                            type="button"
                                            onClick={() => setResumeFile(null)}
                                            className="profile-resume-clear"
                                        >
                                            Clear Selection
                                        </button>
                                    )}
                                </div>
                                {uploadProgress > 0 && uploadProgress < 100 && (
                                    <div className="profile-upload-progress">
                                        Uploading... {Math.round(uploadProgress)}%
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={loading} className="profile-submit-btn">
                        {loading ? (uploadProgress > 0 && uploadProgress < 100 ? `Uploading Resume ${Math.round(uploadProgress)}%...` : 'Saving...') : 'Save Profile Changes'}
                    </button>

                </form>
            </div>
        </div>
    )
}