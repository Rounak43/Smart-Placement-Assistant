import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CodeIcon from '@mui/icons-material/Code'
import RouteIcon from '@mui/icons-material/Route'
import QuizIcon from '@mui/icons-material/Quiz'
import WorkIcon from '@mui/icons-material/Work'
import ArticleIcon from '@mui/icons-material/Article'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(val) {
    if (!val) return '—'
    const ms = typeof val === 'number' ? val : val?.toMillis?.() || 0
    if (!ms) return '—'
    return new Date(ms).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

function daysSince(val) {
    if (!val) return 0
    const ms = typeof val === 'number' ? val : val?.toMillis?.() || 0
    if (!ms) return 0
    return Math.max(0, Math.floor((Date.now() - ms) / (1000 * 60 * 60 * 24)))
}

function bestRoadmapCompletion(data) {
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    let best = 0, bestKey = null
    for (const key of roadmapKeys) {
        if (!data?.[key]) continue
        let count = 0
        for (let i = 1; i <= 10; i++) {
            if (data[key][`step${i}Passed`] === true) count++
        }
        if (count > best) { best = count; bestKey = key }
    }
    return { count: best, key: bestKey, pct: Math.round((best / 10) * 100) }
}

function totalRoadmapCompleted(data) {
    if (!data) return 0
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    let total = 0
    for (const key of roadmapKeys) {
        if (!data[key]) continue
        for (let i = 1; i <= 10; i++) {
            if (data[key][`step${i}Passed`] === true) total++
        }
    }
    return total
}

function countDsaSolved(data) {
    if (!data?.dsaProgress) return 0
    return Object.values(data.dsaProgress).filter(v => v === true).length
}

function getCompletedDsaTopics(data) {
    if (!data?.dsaProgress) return []
    return Object.entries(data.dsaProgress)
        .filter(([, v]) => v === true)
        .map(([k]) => k)
        .slice(0, 6)
}

function getPendingRoadmapSteps(data) {
    if (!data) return []
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    const roadmapLabels = { aimlRoadmap: 'AI/ML', webDevRoadmap: 'Web Dev', softwareEngineeringRoadmap: 'SWE', dataScienceRoadmap: 'Data Science', dataAnalysisRoadmap: 'Data Analysis' }
    const pending = []
    for (const key of roadmapKeys) {
        if (!data[key]) continue
        for (let i = 1; i <= 10; i++) {
            if (data[key][`step${i}Passed`] !== true && data[key][`step${i - 1}Passed`] === true) {
                pending.push(`${roadmapLabels[key]} Step ${i}`)
                if (pending.length >= 4) break
            }
        }
        if (pending.length >= 4) break
    }
    return pending
}

// ── Progress Bar Component ────────────────────────────────────────────────────
function ProgressBar({ label, pct, colorClass = '', icon }) {
    return (
        <div className="admin-progress-bar">
            <div className="admin-progress-label-row">
                <span className="admin-progress-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {icon}
                    {label}
                </span>
                <span className="admin-progress-pct">{pct}%</span>
            </div>
            <div className="admin-progress-track">
                <div className={`admin-progress-fill ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function UserDetails() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const docRef = doc(db, 'users', userId)
                const snap = await getDoc(docRef)
                if (snap.exists()) {
                    setUserData({ id: snap.id, ...snap.data() })
                } else {
                    setError('User not found in database.')
                }
            } catch (err) {
                console.error('UserDetails: error fetching user', err)
                setError('Failed to load user data.')
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [userId])

    if (loading) return <div className="admin-loading">⏳ Loading user profile…</div>
    if (error) return (
        <div className="admin-empty-state">
            <WarningAmberIcon />
            <p>{error}</p>
            <button className="admin-btn admin-btn-ghost" onClick={() => navigate(-1)}>← Go Back</button>
        </div>
    )

    const u = userData
    const initials = (u.name || u.email || 'U').charAt(0).toUpperCase()

    // ── Computed Stats ──────────────────────────────────────────────
    const { pct: roadmapPct, count: roadmapCount } = bestRoadmapCompletion(u)
    const totalRoadmap = totalRoadmapCompleted(u)
    const dsaSolved = countDsaSolved(u)
    const dsaTotalGuess = 150 // approximate, adjust to your DSA sheet size
    const dsaPct = Math.min(100, Math.round((dsaSolved / dsaTotalGuess) * 100))
    const aptitudeTests = u.aptitudeTestsTaken || 0
    const aptitudePct = Math.min(100, aptitudeTests * 10) // 10% per test, max 100
    const interviewPct = u.interviewPrepPct || 0

    const resumeComplete = !!u.resume || !!(u.branch && u.skills && u.name && u.email)
    const joinDaysAgo = daysSince(u.joinedDate || u.createdAt)
    const lastLoginDaysAgo = daysSince(u.lastLogin)

    const completedDsaTopics = getCompletedDsaTopics(u)
    const pendingSteps = getPendingRoadmapSteps(u)

    const isActive = lastLoginDaysAgo <= 7

    return (
        <div>
            {/* ── Back + Header ── */}
            <div style={{ marginBottom: 24 }}>
                <button
                    className="admin-btn admin-btn-ghost admin-btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}
                    onClick={() => navigate(-1)}
                >
                    <ArrowBackIcon sx={{ fontSize: 16 }} />
                    Back to Users
                </button>

                <div className="admin-detail-header">
                    <div className="admin-detail-avatar">{initials}</div>
                    <div style={{ flex: 1 }}>
                        <h1 className="admin-detail-name">{u.name || 'Anonymous User'}</h1>
                        <p className="admin-detail-email">{u.email || '—'}</p>
                        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
                                {isActive ? '● Active' : '● Inactive'}
                            </span>
                            {u.focusArea && <span className="admin-tag">{u.focusArea}</span>}
                            {u.dreamCompany && (
                                <span className="admin-tag amber">
                                    <WorkIcon sx={{ fontSize: 12, verticalAlign: 'middle', marginRight: 3 }} />
                                    {u.dreamCompany}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Meta Grid ── */}
            <div className="admin-card" style={{ marginBottom: 20 }}>
                <div className="admin-card-header">
                    <div className="admin-card-title">Profile Information</div>
                </div>
                <div className="admin-detail-meta-grid">
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Full Name</div>
                        <div className="admin-meta-value">{u.name || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Email</div>
                        <div className="admin-meta-value" style={{ fontSize: 13 }}>{u.email || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Focus Area</div>
                        <div className="admin-meta-value">{u.focusArea || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Dream Company</div>
                        <div className="admin-meta-value">{u.dreamCompany || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">
                            <CalendarTodayIcon sx={{ fontSize: 12, verticalAlign: 'middle', marginRight: 3 }} />
                            Join Date
                        </div>
                        <div className="admin-meta-value">{fmtDate(u.joinedDate || u.createdAt)}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">
                            <AccessTimeIcon sx={{ fontSize: 12, verticalAlign: 'middle', marginRight: 3 }} />
                            Last Login
                        </div>
                        <div className="admin-meta-value">{fmtDate(u.lastLogin)}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Days Since Joined</div>
                        <div className="admin-meta-value">{joinDaysAgo} days</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Branch</div>
                        <div className="admin-meta-value">{u.branch || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">CGPA</div>
                        <div className="admin-meta-value">{u.cgpa || '—'}</div>
                    </div>
                    <div className="admin-meta-item">
                        <div className="admin-meta-label">Resume</div>
                        <div className="admin-meta-value">
                            <span className={`status-badge ${resumeComplete ? 'active' : 'inactive'}`}>
                                {resumeComplete ? 'Complete' : 'Incomplete'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Two-column: Progress + Stats ── */}
            <div className="admin-detail-grid">
                {/* Progress Bars */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">Progress Overview</div>
                    </div>
                    <div className="admin-progress-section">
                        <ProgressBar
                            label="DSA Progress"
                            pct={dsaPct}
                            colorClass="blue"
                            icon={<CodeIcon sx={{ fontSize: 16, color: '#60a5fa' }} />}
                        />
                        <ProgressBar
                            label="Roadmap Progress"
                            pct={roadmapPct}
                            colorClass=""
                            icon={<RouteIcon sx={{ fontSize: 16, color: '#818cf8' }} />}
                        />
                        <ProgressBar
                            label="Aptitude Tests"
                            pct={aptitudePct}
                            colorClass="amber"
                            icon={<QuizIcon sx={{ fontSize: 16, color: '#fbbf24' }} />}
                        />
                        <ProgressBar
                            label="Interview Prep"
                            pct={interviewPct}
                            colorClass="teal"
                            icon={<WorkIcon sx={{ fontSize: 16, color: '#2dd4bf' }} />}
                        />
                        <ProgressBar
                            label="Resume Completion"
                            pct={resumeComplete ? 100 : 30}
                            colorClass="green"
                            icon={<ArticleIcon sx={{ fontSize: 16, color: '#4ade80' }} />}
                        />
                    </div>
                </div>

                {/* Completion Stats */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">Detailed Stats</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        {[
                            { label: 'DSA Problems Solved', value: dsaSolved, icon: <CodeIcon sx={{ fontSize: 20, color: '#60a5fa' }} />, color: '#60a5fa' },
                            { label: 'Roadmap Steps Done', value: roadmapCount, icon: <RouteIcon sx={{ fontSize: 20, color: '#818cf8' }} />, color: '#818cf8' },
                            { label: 'Total Roadmap (All)', value: totalRoadmap, icon: <CheckCircleIcon sx={{ fontSize: 20, color: '#4ade80' }} />, color: '#4ade80' },
                            { label: 'Aptitude Tests Taken', value: aptitudeTests, icon: <QuizIcon sx={{ fontSize: 20, color: '#fbbf24' }} />, color: '#fbbf24' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'rgba(15,17,23,0.5)',
                                borderRadius: 12,
                                padding: '16px',
                                border: '1px solid rgba(99,102,241,0.08)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 8,
                            }}>
                                {item.icon}
                                <div style={{ fontSize: 24, fontWeight: 700, color: item.color }}>{item.value}</div>
                                <div style={{ fontSize: 12, color: '#475569', fontWeight: 500 }}>{item.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Row: Weak Topics + Recent Completed ── */}
            <div className="admin-detail-grid">
                {/* Pending / Weak Topics */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">
                            <WarningAmberIcon sx={{ color: '#fbbf24' }} />
                            Pending / Weak Areas
                        </div>
                    </div>
                    {pendingSteps.length === 0 ? (
                        <div style={{ color: '#475569', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
                            🎉 No pending roadmap steps detected!
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {pendingSteps.map((step, i) => (
                                <span key={i} className="admin-tag amber">{step}</span>
                            ))}
                        </div>
                    )}
                    <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 12, color: '#475569', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Skills on Profile
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {u.skills?.length
                                ? u.skills.map((s, i) => <span key={i} className="admin-tag">{s}</span>)
                                : <span style={{ color: '#334155', fontSize: 13 }}>No skills added yet</span>
                            }
                        </div>
                    </div>
                </div>

                {/* Recently Completed DSA Topics */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">
                            <CheckCircleIcon sx={{ color: '#4ade80' }} />
                            Recently Completed (DSA)
                        </div>
                    </div>
                    {completedDsaTopics.length === 0 ? (
                        <div style={{ color: '#475569', fontSize: 14, textAlign: 'center', padding: '20px 0' }}>
                            No DSA problems solved yet.
                        </div>
                    ) : (
                        <div className="admin-activity-list">
                            {completedDsaTopics.map((topic, i) => (
                                <div className="admin-activity-item" key={i}>
                                    <div className="admin-activity-dot green" />
                                    <div className="admin-activity-text">
                                        Solved: <strong>{topic}</strong>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 12, color: '#475569', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Certifications
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {u.certifications?.length
                                ? u.certifications.map((c, i) => <span key={i} className="admin-tag green">{c}</span>)
                                : <span style={{ color: '#334155', fontSize: 13 }}>None added</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
