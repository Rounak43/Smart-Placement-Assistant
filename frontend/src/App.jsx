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

  // Minimal loading spinner for Suspense
  const FallbackLoader = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-primary)' }}>
      Loading Content...
    </div>
  )

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={!user ? <Landingpage /> : <Navigate to="/dashboard" />} />

          {/* Protected Route */}
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />}>
            {/* Default Dashboard View */}
            <Route index element={<DashboardHome />} />
            {/* <Route path="jobs" element={<Jobs />} /> */}
            <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

