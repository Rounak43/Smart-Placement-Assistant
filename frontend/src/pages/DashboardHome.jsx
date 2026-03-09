import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import '../styles/DashboardHome.css';

export default function DashboardHome() {
    const { user } = useOutletContext() || {};
    const [dbName, setDbName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("DashboardHome: Triggered fetchUserData. User UID:", user?.uid);
            if (user?.uid) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        console.log("DashboardHome: Firestore data retrieved:", data);
                        if (data.name) {
                            console.log("DashboardHome: Found name:", data.name);
                            setDbName(data.name);
                        } else {
                            console.log("DashboardHome: User document exists, but no 'name' field.");
                        }
                    } else {
                        console.log("DashboardHome: No user document found in Firestore.");
                    }
                } catch (error) {
                    console.error("DashboardHome: Error fetching user data from Firestore:", error);
                }
            } else {
                console.log("DashboardHome: No user uid available from context.");
            }
        };

        fetchUserData();
    }, [user]);

    console.log("DashboardHome: Current dbName state:", dbName);
    console.log("DashboardHome: Current user auth displayName:", user?.displayName);

    const displayFirstName = dbName
        ? dbName
        : (user?.displayName ? user.displayName.split(' ')[0] : 'User')
    return (
        <div className="dashboard-home-container">
            {/* Section 1: Welcome Header */}
            <header className="dash-header dash-header-centered">
                <div className="dash-welcome">
                    <h1>Welcome back, {displayFirstName} 🚀</h1>
                    <p>Track your progress, improve your skills, and get closer to your dream job every day.</p>
                </div>
            </header>

        </div>
    );
}
