import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AiRoadmap from "./AiRoadmap";
import WebDevRoadmap from "./WebDevRoadmap";
import SoftwareEngRoadmap from "./SoftwareEngRoadmap";
import DataScienceRoadmap from "./DataScienceRoadmap";
import DataAnalysisRoadmap from "./DataAnalysisRoadmap";

export default function Roadmap() {
    const { user } = useOutletContext() || {};
    const [focusArea, setFocusArea] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) {
            setLoading(false);
            return;
        }

        const docRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setFocusArea(docSnap.data().focusArea);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', color: 'var(--text-primary)' }}>
                Loading roadmap...
            </div>
        );
    }

    const currentFocus = focusArea?.trim();
    console.log("Roadmap Router: Current focusArea is '", currentFocus, "'");

    if (currentFocus === "Web Development") {
        return <WebDevRoadmap />;
    } else if (currentFocus === "Software Engineering") {
        return <SoftwareEngRoadmap />;
    } else if (currentFocus === "Data Science") {
        return <DataScienceRoadmap />;
    } else if (currentFocus === "Data Analysis") {
        return <DataAnalysisRoadmap />;
    }

    // Default to AI Roadmap if AI/ML, Data Science, or unselected
    return <AiRoadmap />;
}
