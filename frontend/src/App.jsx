import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebase'

// Fast static imports instead of React.lazy() to avoid Suspense white screens
import Landingpage from './pages/landingpage'
import Dashboard from './pages/Dashboard'
import DashboardHome from './pages/DashboardHome'
import Profile from './pages/Profile'
import Setting from './pages/Setting'
import AnalysisPage from './pages/AnalysisPage'
import Roadmap from './pages/roadmap'
import DsaPractice from './pages/DsaPractice'
import AptitudeTest from './pages/AptitudeTest'
import AptitudeTestExam from './pages/AptitudeTestExam'

// Admin Panel
import AdminRoute from './components/AdminRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersManagement from './pages/admin/UsersManagement'
import UserDetails from './pages/admin/UserDetails'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark'
    document.documentElement.setAttribute('data-theme', savedTheme)

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  if (loading) return <div>Loading Application...</div>

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={!user ? <Landingpage /> : <Navigate to="/dashboard" />} />

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />}>
            <Route index element={<DashboardHome />} />
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="setting" element={<Setting />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="dsa-practice" element={<DsaPractice />} />
            <Route path="aptitude" element={<AptitudeTest />} />
          </Route>

          {/* Hidden Aptitude Exam Route */}
          <Route path="/aptitude-exam" element={user ? <AptitudeTestExam user={user} /> : <Navigate to="/" />} />

          {/* ── Admin Routes (protected by AdminRoute) ── */}
          <Route element={<AdminRoute user={user} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="users/:userId" element={<UserDetails />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
