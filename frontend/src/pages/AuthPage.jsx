import { useState, useEffect } from "react";
import Signin from "./signin";
import Signup from "./signup";
import "../styles/Signuppage.css";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function AuthPage({ mode = 'login', onClose }) {

    const [isLogin, setIsLogin] = useState(mode === 'login');

    useEffect(() => {
        // respond to external mode changes (e.g., open as signup)
        setIsLogin(mode === 'login');
    }, [mode]);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {

            if (user) {
                console.log("User already logged in:", user);
            } else {
                console.log("No user");
            }

        });

        return () => unsubscribe();

    }, []);

    return (
        <div className="auth-overlay" onClick={() => onClose && onClose()}>
            <div className="auth-container" onClick={(e) => e.stopPropagation()}>

                <div className="auth-box">

                    <button className="auth-close" onClick={() => onClose && onClose()}>×</button>

                    <div className="auth-toggle">
                        <button
                            className={isLogin ? "active" : ""}
                            onClick={() => setIsLogin(true)}
                        >
                            Sign In
                        </button>

                        <button
                            className={!isLogin ? "active" : ""}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {isLogin ? <Signin /> : <Signup />}

                </div>
            </div>
        </div>
    )
}
