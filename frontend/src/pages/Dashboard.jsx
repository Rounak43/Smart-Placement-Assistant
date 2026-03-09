import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import Footer from '../components/Footer'
import OnboardingModal from '../components/OnboardingModal'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import '../styles/Dashboard.css';

export default function Dashboard({ user }) {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            if (user?.uid) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        // If roadmapGenerated is missing or explicitly false, show modal
                        if (!data.roadmapGenerated) {
                            setShowOnboarding(true);
                        }
                    } else {
                        // User doc doesn't exist at all yet, probably definitely need onboarding
                        setShowOnboarding(true);
                    }
                } catch (error) {
                    console.error("Error checking onboarding status:", error);
                } finally {
                    setLoadingData(false);
                }
            } else {
                setLoadingData(false);
            }
        };

        checkOnboardingStatus();
    }, [user]);

    if (loadingData) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text-primary)' }}>Loading user data...</div>;

    return (
        <div className="flex flex-col min-h-screen relative">
            {showOnboarding && <OnboardingModal user={user} onComplete={() => setShowOnboarding(false)} />}
            <div className='nav'>
                <Navbar user={user} />
            </div>
            <div className='content'>

                <Outlet context={{ user }} />
            </div>
            <Footer />
        </div>
    )
}