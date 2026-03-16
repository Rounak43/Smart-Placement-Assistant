import React from 'react';
import { useOutletContext } from 'react-router-dom';
import PlacementReadiness from '../components/PlacementReadiness';
import PerformanceAnalystClean from '../components/PerformanceAnalystClean';
import '../styles/DashboardHome.css';

export default function AnalysisPage() {
    const { user } = useOutletContext() || {};

    return (
        <div className="dashboard-home-container">
            <header className="dash-header dash-header-centered">
                <div className="dash-welcome">
                    <h1>Performance Analysis 📊</h1>
                    <p>Get deep AI-driven insights into your readiness and track your historical performance.</p>
                </div>
            </header>

            <div style={{ padding: '0 2rem' }}>
                <PlacementReadiness user={user} />
                <PerformanceAnalystClean user={user} />
            </div>
        </div>
    );
}
