import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import AuthPage from './AuthPage'
import Dashboard from './Dashboard'
import Landing_navbar from '../components/Landingnavbar'
import Footer from '../components/Footer'
import '../styles/landingpage.css'

export default function Landingpage() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState(null)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])
  if (user) return <Dashboard user={user} />
  const openAuth = (mode) => setAuthMode(mode)
  return (
    <div className="landingpage">
      <Landing_navbar onAuthOpen={openAuth} />
      <main className="hero">
        <div className="hero-left">
          <h1>AI Powered Smart Placement Platform</h1>
          <p className="subtitle">Empowering students with personalized placement recommendations, mock interviews, and performance insights.</p>
          <div className="hero-ctas">
            <button className="primary" onClick={() => openAuth('signup')}>Get Started</button>
            <button className="ghost" onClick={() => openAuth('login')}>Login</button>
          </div>
        </div>
        
      </main>
      <Footer />
      {authMode &&  <AuthPage mode={authMode} onClose={() => setAuthMode(null)} />}
    </div>
  )
}