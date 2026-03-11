import { useState, useEffect, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PeopleIcon from '@mui/icons-material/People'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const PAGE_SIZE = 10

function computeCompletion(data) {
    if (!data) return 0
    const roadmapKeys = ['aimlRoadmap', 'webDevRoadmap', 'softwareEngineeringRoadmap', 'dataScienceRoadmap', 'dataAnalysisRoadmap']
    let best = 0
    for (const key of roadmapKeys) {
        if (!data[key]) continue
        let count = 0
        for (let i = 1; i <= 10; i++) {
            if (data[key][`step${i}Passed`] === true) count++
        }
        const pct = Math.round((count / 10) * 100)
        if (pct > best) best = pct
    }
    return best
}

function isActiveUser(data) {
    if (!data?.lastLogin) return false
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const last = typeof data.lastLogin === 'number' ? data.lastLogin : data.lastLogin?.toMillis?.() || 0
    return last > sevenDaysAgo
}

function fmtDate(val) {
    if (!val) return '—'
    const ms = typeof val === 'number' ? val : val?.toMillis?.() || 0
    if (!ms) return '—'
    return new Date(ms).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function UsersManagement() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const snap = await getDocs(collection(db, 'users'))
                const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
                setUsers(list)
            } catch (err) {
                console.error('UsersManagement: error fetching users', err)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    // ── Filter + Search ──────────────────────────────────────────────────────
    const filtered = useMemo(() => {
        const q = search.toLowerCase()
        return users.filter(u => {
            const matchSearch =
                !q ||
                (u.name || '').toLowerCase().includes(q) ||
                (u.email || '').toLowerCase().includes(q) ||
                (u.focusArea || '').toLowerCase().includes(q) ||
                (u.dreamCompany || '').toLowerCase().includes(q)
            const active = isActiveUser(u)
            const matchStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && active) ||
                (statusFilter === 'inactive' && !active)
            return matchSearch && matchStatus
        })
    }, [users, search, statusFilter])

    // ── Pagination ───────────────────────────────────────────────────────────
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    const handleSearch = (e) => { setSearch(e.target.value); setPage(1) }
    const handleFilter = (e) => { setStatusFilter(e.target.value); setPage(1) }

    if (loading) return <div className="admin-loading">⏳ Loading users…</div>

    return (
        <div>
            {/* ── Page Header ── */}
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e2e8f0', margin: '0 0 6px' }}>
                    Users Management
                </h1>
                <p style={{ color: '#64748b', margin: 0, fontSize: 14 }}>
                    {users.length} total users on the platform
                </p>
            </div>

            {/* ── Table Card ── */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <div className="admin-card-title">
                        <PeopleIcon />
                        All Users
                        <span style={{ fontSize: 13, fontWeight: 500, color: '#475569', marginLeft: 4 }}>
                            ({filtered.length} results)
                        </span>
                    </div>
                </div>

                {/* ── Controls ── */}
                <div className="admin-controls">
                    <div className="admin-search-wrap">
                        <SearchIcon />
                        <input
                            className="admin-search"
                            placeholder="Search by name, email, goal…"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <FilterListIcon sx={{ color: '#475569', fontSize: 18 }} />
                        <select
                            className="admin-filter-select"
                            value={statusFilter}
                            onChange={handleFilter}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active (7d)</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Goal / Focus</th>
                                <th>Dream Company</th>
                                <th>Joined</th>
                                <th>Last Active</th>
                                <th>Progress</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ textAlign: 'center', color: '#475569', padding: '40px 0' }}>
                                        No users match your search or filter.
                                    </td>
                                </tr>
                            ) : (
                                paginated.map(u => {
                                    const initials = (u.name || u.email || 'U').charAt(0).toUpperCase()
                                    const completion = computeCompletion(u)
                                    const active = isActiveUser(u)
                                    const lastLoginMs = typeof u.lastLogin === 'number' ? u.lastLogin : u.lastLogin?.toMillis?.() || 0
                                    return (
                                        <tr key={u.id}>
                                            <td>
                                                <div className="user-name-cell">
                                                    <div className="admin-avatar admin-avatar-sm">{initials}</div>
                                                    <div>
                                                        <div className="cell-main">{u.name || '—'}</div>
                                                        <div className="cell-sub">{u.email || '—'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#c7d2fe' }}>{u.focusArea || '—'}</td>
                                            <td>{u.dreamCompany || '—'}</td>
                                            <td>{fmtDate(u.joinedDate || u.createdAt)}</td>
                                            <td>{lastLoginMs ? fmtDate(u.lastLogin) : '—'}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 90 }}>
                                                    <div style={{ flex: 1, height: 6, background: 'rgba(99,102,241,0.1)', borderRadius: 99, overflow: 'hidden' }}>
                                                        <div style={{ width: `${completion}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: 99 }} />
                                                    </div>
                                                    <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 600, width: 32, flexShrink: 0 }}>{completion}%</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${active ? 'active' : 'inactive'}`}>
                                                    {active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    className="admin-btn admin-btn-primary admin-btn-sm"
                                                    style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                                                    onClick={() => navigate(`/admin/users/${u.id}`)}
                                                >
                                                    <VisibilityIcon sx={{ fontSize: 14 }} />
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* ── Pagination ── */}
                <div className="admin-pagination">
                    <span>
                        Showing {paginated.length > 0 ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} users
                    </span>
                    <div className="admin-pagination-btns">
                        <button
                            className="admin-page-btn"
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                        >
                            <ChevronLeftIcon sx={{ fontSize: 16 }} />
                        </button>
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            const pg = totalPages <= 5 ? i + 1 : Math.max(1, page - 2) + i
                            if (pg > totalPages) return null
                            return (
                                <button
                                    key={pg}
                                    className={`admin-page-btn ${pg === page ? 'current' : ''}`}
                                    onClick={() => setPage(pg)}
                                >
                                    {pg}
                                </button>
                            )
                        })}
                        <button
                            className="admin-page-btn"
                            disabled={page === totalPages}
                            onClick={() => setPage(p => p + 1)}
                        >
                            <ChevronRightIcon sx={{ fontSize: 16 }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
