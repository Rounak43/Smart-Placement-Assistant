import { Navigate, Outlet } from 'react-router-dom'
import { isAdmin } from '../utils/adminConfig'

/**
 * AdminRoute - Protects any route tree from non-admin users.
 * Usage: wrap admin routes with <AdminRoute user={user} /> in App.jsx
 *
 * To later use DB roles, just update isAdmin() in adminConfig.js.
 */
export default function AdminRoute({ user }) {
    if (!user) return <Navigate to="/" replace />
    if (!isAdmin(user)) return <Navigate to="/dashboard" replace />
    return <Outlet context={{ user }} />
}
