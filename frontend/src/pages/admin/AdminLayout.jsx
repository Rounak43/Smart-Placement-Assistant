import { useState } from 'react'
import { Outlet, NavLink, useNavigate, useOutletContext } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import '../../styles/Admin.css'

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { user } = useOutletContext() || {}

    const closeSidebar = () => setSidebarOpen(false)

    return (
        <div className="admin-layout">
            {/* Mobile Overlay */}
            <div
                className={`admin-overlay ${sidebarOpen ? 'open' : ''}`}
                onClick={closeSidebar}
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <div className="admin-brand">
                        <div className="admin-brand-icon">🛡️</div>
                        <div className="admin-brand-text">
                            <h2>Smart Placement</h2>
                            <span>Admin Panel</span>
                        </div>
                    </div>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-section-label">Overview</div>

                    <NavLink
                        to="/admin"
                        end
                        className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </NavLink>

                    <div className="admin-nav-section-label">Management</div>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
                        onClick={closeSidebar}
                    >
                        <PeopleIcon />
                        <span>Users</span>
                    </NavLink>
                </nav>

                <div className="admin-sidebar-footer">
                    <NavLink to="/dashboard" className="admin-back-link">
                        <ArrowBackIcon sx={{ fontSize: 18 }} />
                        <span>Back to Dashboard</span>
                    </NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {/* Top Bar */}
                <div className="admin-topbar">
                    <div className="admin-topbar-left">
                        <button
                            className="admin-hamburger"
                            onClick={() => setSidebarOpen(v => !v)}
                            aria-label="Toggle sidebar"
                        >
                            <MenuIcon />
                        </button>
                        <AdminPanelSettingsIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                        <span className="admin-page-title">Admin Panel</span>
                    </div>
                    <div className="admin-topbar-right">
                        <span className="admin-badge">🛡 Admin</span>
                        <div className="admin-user-pill">
                            <AdminPanelSettingsIcon sx={{ fontSize: 15, color: '#6366f1' }} />
                            <span>{user?.email || 'admin'}</span>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <div className="admin-content">
                    <Outlet context={{ user }} />
                </div>
            </main>
        </div>
    )
}
