import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import PeopleIcon from '@mui/icons-material/People'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import CodeIcon from '@mui/icons-material/Code'
import RouteIcon from '@mui/icons-material/Route'
import QuizIcon from '@mui/icons-material/Quiz'
import PersonIcon from '@mui/icons-material/Person'
import BarChartIcon from '@mui/icons-material/BarChart'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// ─── Helper: compute completion % from Firestore user doc ─────────────────────
function computeCompletion(data) {
    if (!data) return 0
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    let best = 0
    for (const key of roadmapKeys) {
        if (data[key]) {
            let count = 0
            for (let i = 1; i <= 10; i++) {
                if (data[key][`step${i}Passed`] === true) count++
            }
            const pct = Math.round((count / 10) * 100)
            if (pct > best) best = pct
        }
    }
    return best
}

function countDsaSolved(data) {
    if (!data?.dsaProgress) return 0
    return Object.values(data.dsaProgress).filter(v => v === true).length
}

function countRoadmapTasks(data) {
    if (!data) return 0
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    let total = 0
    for (const key of roadmapKeys) {
        if (data[key]) {
            for (let i = 1; i <= 10; i++) {
                if (data[key][`step${i}Passed`] === true) total++
            }
        }
    }
    return total
}

function countAptitudeTests(data) {
    return data?.aptitudeTestsTaken || 0
}

function isActiveUser(data) {
    if (!data?.lastLogin) return false
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const last = typeof data.lastLogin === 'number' ? data.lastLogin : data.lastLogin?.toMillis?.() || 0
    return last > sevenDaysAgo
}

export default function AdminDashboard() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const snap = await getDocs(collection(db, 'users'))
                const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
                setUsers(list)
            } catch (err) {
                console.error('AdminDashboard: error fetching users', err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    if (loading) return <div className="admin-loading">⏳ Loading admin dashboard…</div>

    // ── Stats ──────────────────────────────────────────────────────────────────
    const totalUsers = users.length
    const activeUsers = users.filter(u => isActiveUser(u)).length
    const avgCompletion = totalUsers
        ? Math.round(users.reduce((sum, u) => sum + computeCompletion(u), 0) / totalUsers)
        : 0
    const totalDsaSolved = users.reduce((sum, u) => sum + countDsaSolved(u), 0)
    const totalRoadmapTasks = users.reduce((sum, u) => sum + countRoadmapTasks(u), 0)
    const totalAptitudeTests = users.reduce((sum, u) => sum + countAptitudeTests(u), 0)

    // ── Recent Users (last 5 by joinedDate) ────────────────────────────────────
    const recentUsers = [...users]
        .sort((a, b) => {
            const aTime = typeof a.joinedDate === 'number' ? a.joinedDate : a.joinedDate?.toMillis?.() || 0
            const bTime = typeof b.joinedDate === 'number' ? b.joinedDate : b.joinedDate?.toMillis?.() || 0
            return bTime - aTime
        })
        .slice(0, 5)

    // ── Bar Chart: completions distribution ────────────────────────────────────
    const brackets = [
        { label: '0–20%', count: 0, color: '#6366f1' },
        { label: '21–40%', count: 0, color: '#8b5cf6' },
        { label: '41–60%', count: 0, color: '#a78bfa' },
        { label: '61–80%', count: 0, color: '#c4b5fd' },
        { label: '81–100%', count: 0, color: '#ddd6fe' },
    ]
    users.forEach(u => {
        const pct = computeCompletion(u)
        if (pct <= 20) brackets[0].count++
        else if (pct <= 40) brackets[1].count++
        else if (pct <= 60) brackets[2].count++
        else if (pct <= 80) brackets[3].count++
        else brackets[4].count++
    })
    const maxBracket = Math.max(...brackets.map(b => b.count), 1)

    // ── Format date ────────────────────────────────────────────────────────────
    const fmtDate = (val) => {
        if (!val) return '—'
        const ms = typeof val === 'number' ? val : val?.toMillis?.() || 0
        return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    }

    return (
        <div>
            {/* ── Page Header ── */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0', margin: '0 0 6px' }}>
                    Admin Dashboard
                </h1>
                <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>
                    Platform overview — live data from Firestore
                </p>
            </div>

            {/* ── Stat Cards Grid ── */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#6366f1,#8b5cf6)' }}>
                    <div className="admin-stat-icon indigo"><PeopleIcon /></div>
                    <div className="admin-stat-label">Total Users</div>
                    <div className="admin-stat-value">{totalUsers}</div>
                </div>
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#22c55e,#4ade80)' }}>
                    <div className="admin-stat-icon green"><PersonIcon /></div>
                    <div className="admin-stat-label">Active (7d)</div>
                    <div className="admin-stat-value">{activeUsers}</div>
                    <div className="admin-stat-sub">
                        {totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0}% of users
                    </div>
                </div>
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#f59e0b,#fbbf24)' }}>
                    <div className="admin-stat-icon amber"><TrendingUpIcon /></div>
                    <div className="admin-stat-label">Avg Completion</div>
                    <div className="admin-stat-value">{avgCompletion}%</div>
                </div>
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#3b82f6,#60a5fa)' }}>
                    <div className="admin-stat-icon blue"><CodeIcon /></div>
                    <div className="admin-stat-label">DSA Solved</div>
                    <div className="admin-stat-value">{totalDsaSolved}</div>
                </div>
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#14b8a6,#2dd4bf)' }}>
                    <div className="admin-stat-icon teal"><RouteIcon /></div>
                    <div className="admin-stat-label">Roadmap Tasks</div>
                    <div className="admin-stat-value">{totalRoadmapTasks}</div>
                </div>
                <div className="admin-stat-card" style={{ '--card-accent': 'linear-gradient(90deg,#f43f5e,#fb7185)' }}>
                    <div className="admin-stat-icon rose"><QuizIcon /></div>
                    <div className="admin-stat-label">Aptitude Tests</div>
                    <div className="admin-stat-value">{totalAptitudeTests}</div>
                </div>
            </div>

            {/* ── Row: Bar Chart + Recent Activity ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                {/* Bar Chart */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">
                            <BarChartIcon />
                            Completion Distribution
                        </div>
                    </div>
                    <div className="admin-bar-chart">
                        {brackets.map((b, i) => (
                            <div className="admin-bar-item" key={i}>
                                <div className="admin-bar-value">{b.count}</div>
                                <div
                                    className="admin-bar"
                                    style={{
                                        height: `${Math.max((b.count / maxBracket) * 120, 4)}px`,
                                        background: `linear-gradient(180deg, ${b.color}cc, ${b.color}55)`
                                    }}
                                />
                                <div className="admin-bar-label">{b.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <div className="admin-card-title">
                            <AccessTimeIcon />
                            Recent Activity
                        </div>
                    </div>
                    <div className="admin-activity-list">
                        {recentUsers.length === 0 ? (
                            <div className="admin-empty-state" style={{ padding: '20px 0' }}>No users yet</div>
                        ) : (
                            recentUsers.map((u, i) => (
                                <div className="admin-activity-item" key={u.id}>
                                    <div className={`admin-activity-dot ${i % 3 === 0 ? 'green' : i % 3 === 1 ? 'amber' : 'blue'}`} />
                                    <div className="admin-activity-text">
                                        <strong>{u.name || u.email?.split('@')[0] || 'Anonymous'}</strong> joined the platform
                                    </div>
                                    <div className="admin-activity-time">{fmtDate(u.joinedDate || u.createdAt)}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── Recent Users Table ── */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-card-title">
                        <PeopleIcon />
                        Recent Users
                    </div>
                    <button
                        className="admin-btn admin-btn-ghost admin-btn-sm"
                        onClick={() => navigate('/admin/users')}
                    >
                        View All →
                    </button>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Goal</th>
                                <th>Completion</th>
                                <th>Joined</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', color: '#475569', padding: '32px 0' }}>
                                        No users found in Firestore
                                    </td>
                                </tr>
                            ) : (
                                recentUsers.map(u => {
                                    const initials = (u.name || u.email || 'U').charAt(0).toUpperCase()
                                    const completion = computeCompletion(u)
                                    const active = isActiveUser(u)
                                    return (
                                        <tr key={u.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/users/${u.id}`)}>
                                            <td>
                                                <div className="user-name-cell">
                                                    <div className="admin-avatar admin-avatar-sm">{initials}</div>
                                                    <div>
                                                        <div className="cell-main">{u.name || 'No name'}</div>
                                                        <div className="cell-sub">{u.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{u.focusArea || '—'}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div style={{ flex: 1, height: 6, background: 'rgba(99,102,241,0.1)', borderRadius: 99, overflow: 'hidden', minWidth: 60 }}>
                                                        <div style={{ width: `${completion}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 99 }} />
                                                    </div>
                                                    <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 600, width: 32 }}>{completion}%</span>
                                                </div>
                                            </td>
                                            <td>{fmtDate(u.joinedDate || u.createdAt)}</td>
                                            <td>
                                                <span className={`status-badge ${active ? 'active' : 'inactive'}`}>
                                                    {active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
