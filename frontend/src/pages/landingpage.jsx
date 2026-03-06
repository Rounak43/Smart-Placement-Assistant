import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import AuthPage from './AuthPage'
import Dashboard from './Dashboard'
import Landing_navbar from '../components/Landingnavbar'
import Footer from '../components/Footer'
import '../styles/landingpage.css'

// MUI Icons
import SearchOffIcon from '@mui/icons-material/SearchOff';
import TimelineIcon from '@mui/icons-material/Timeline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import MapIcon from '@mui/icons-material/Map';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CampaignIcon from '@mui/icons-material/Campaign';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlagIcon from '@mui/icons-material/Flag';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Animated Stat Counter Component
const AnimatedStat = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const nodeRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let startTime;
    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration, hasAnimated]);

  return (
    <div className="stat-item" ref={nodeRef}>
      <h3 className="stat-number">{count}{suffix}</h3>
    </div>
  );
};

export default function Landingpage() {
  const [user, setUser] = useState(null)
  const [authMode, setAuthMode] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  if (user) return <Dashboard user={user} />
  const openAuth = (mode) => setAuthMode(mode)

  return (
    <div className="landingpage">
      <Landing_navbar onAuthOpen={openAuth} />

      {/* 1. Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Ultimate <span className="text-gradient">Placement Preparation</span> Platform
          </h1>
          <p className="hero-tagline">Track, Learn, and Succeed</p>
          <p className="hero-description">
            Empowering students with personalized placement recommendations, mock interviews, and performance insights to crack their dream jobs.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => openAuth('signup')}>Get Started</button>
            <button className="btn-ghost" onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}>
              Explore Features
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="dashboard-preview glass-panel">
            <div className="preview-header">
              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
            </div>
            <div className="preview-body">
              <div className="preview-sidebar"></div>
              <div className="preview-content">
                <div className="preview-card"></div>
                <div className="preview-card"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Strip */}
      <section className="stats-strip fade-in-section">
        <div className="stats-container glass-panel">
          <div className="stat-group">
            <AnimatedStat end={5000} suffix="+" />
            <p>Active Students</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-group">
            <AnimatedStat end={200} suffix="+" />
            <p>Hiring Companies</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-group">
            <AnimatedStat end={95} suffix="%" />
            <p>Placement Rate</p>
          </div>
        </div>
      </section>

      {/* 2. Problem Section */}
      <section className="problem-section fade-in-section">
        <h2 className="section-title">The Struggle is Real</h2>
        <p className="section-subtitle">Common challenges students face during placement season</p>
        <div className="problem-grid">
          <div className="problem-card glass-panel">
            <SearchOffIcon className="problem-icon" />
            <h3>Resource Overload</h3>
            <p>Spending too much time finding quality study materials instead of actually learning.</p>
          </div>
          <div className="problem-card glass-panel">
            <TimelineIcon className="problem-icon" />
            <h3>Poor Tracking</h3>
            <p>Losing track of applications, upcoming interviews, and preparation progress.</p>
          </div>
          <div className="problem-card glass-panel">
            <BusinessCenterIcon className="problem-icon" />
            <h3>Lack of Insights</h3>
            <p>Lack of understanding about specific company requirements and interview patterns.</p>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="features-section fade-in-section">
        <h2 className="section-title">Everything You Need to Succeed</h2>
        <div className="features-grid">
          <div className="feature-card glass-panel">
            <MapIcon className="feature-icon" />
            <h3>Placement Roadmap</h3>
            <p>Follow a structured, step-by-step preparation guide tailored to your target role.</p>
          </div>
          <div className="feature-card glass-panel">
            <TrackChangesIcon className="feature-icon" />
            <h3>Progress Tracker</h3>
            <p>Monitor your learning journey and application status in one intuitive dashboard.</p>
          </div>
          <div className="feature-card glass-panel">
            <QuestionAnswerIcon className="feature-icon" />
            <h3>Interview Questions</h3>
            <p>Practice with real, company-specific interview questions and mock assessments.</p>
          </div>
          <div className="feature-card glass-panel">
            <MenuBookIcon className="feature-icon" />
            <h3>Study Resources</h3>
            <p>Access curated, high-quality DSA, core subjects, and aptitude preparation materials.</p>
          </div>
          <div className="feature-card glass-panel">
            <CampaignIcon className="feature-icon" />
            <h3>Company Updates</h3>
            <p>Stay informed with the latest placement opportunities and hiring drives.</p>
          </div>
          <div className="feature-card glass-panel">
            <PersonAddIcon className="feature-icon" />
            <h3>Resume Builder</h3>
            <p>Create professional, ATS-friendly resumes tailored for the roles you want.</p>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="how-it-works-section fade-in-section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <PersonAddIcon className="step-icon" />
            <h4>Sign Up</h4>
            <p>Create your free student account.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <FlagIcon className="step-icon" />
            <h4>Set Goals</h4>
            <p>Choose your preparation track.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <TipsAndUpdatesIcon className="step-icon" />
            <h4>Practice</h4>
            <p>Learn using curated resources.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">4</div>
            <TrendingUpIcon className="step-icon" />
            <h4>Improve</h4>
            <p>Track progress and ace interviews.</p>
          </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section className="benefits-section fade-in-section">
        <div className="benefits-content">
          <h2 className="section-title">Why Choose Smart Placement?</h2>
          <ul className="benefits-list">
            <li>
              <AccessTimeIcon className="benefit-icon" />
              <div>
                <h4>Saves Time</h4>
                <p>Stop searching, start learning with curated materials.</p>
              </div>
            </li>
            <li>
              <MapIcon className="benefit-icon" />
              <div>
                <h4>Structured Path</h4>
                <p>No more confusion about what to study and when.</p>
              </div>
            </li>
            <li>
              <QuestionAnswerIcon className="benefit-icon" />
              <div>
                <h4>All-in-One Practice</h4>
                <p>DSA, aptitude, and interviews in one place.</p>
              </div>
            </li>
            <li>
              <CheckCircleOutlineIcon className="benefit-icon" />
              <div>
                <h4>Easy Tracking</h4>
                <p>Visualize your progress and boost confidence.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="testimonials-section fade-in-section">
        <h2 className="section-title">What Students Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card glass-panel">
            <p className="quote">"This platform completely changed how I prepare. The roadmap helped me land an offer at my dream company!"</p>
            <div className="student-info">
              <div className="avatar">A</div>
              <div>
                <h4>Aditya Sharma</h4>
                <span>Placed at Amazon</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card glass-panel">
            <p className="quote">"The interview questions were spot on. Tracking applications here saved me so much stress."</p>
            <div className="student-info">
              <div className="avatar">P</div>
              <div>
                <h4>Priya Patel</h4>
                <span>Placed at TCS</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card glass-panel">
            <p className="quote">"I loved the curated DSA resources. Having everything centralized made my journey smooth."</p>
            <div className="student-info">
              <div className="avatar">R</div>
              <div>
                <h4>Rohan Kumar</h4>
                <span>Placed at Infosys</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. About Section */}
      <section className="about-section glass-panel fade-in-section">
        <h2 className="section-title">About the Platform</h2>
        <p>
          Smart Placement is built by students, for students. We understand the chaos of placement season. Our mission is to streamline your preparation by providing a single, unified platform for learning resources, interview practice, and progress tracking so you can focus on landing your dream job.
        </p>
      </section>

      {/* 8. Final Call To Action */}
      <section className="final-cta-section fade-in-section">
        <h2 className="cta-heading">Ready to Crack Your Dream Job?</h2>
        <p>Join thousands of students and start your structured preparation today.</p>
        <button className="btn-primary large-btn" onClick={() => openAuth('signup')}>Start Preparing Now</button>
      </section>

      <Footer />
      {authMode && <AuthPage mode={authMode} onClose={() => setAuthMode(null)} />}
    </div>
  )
}