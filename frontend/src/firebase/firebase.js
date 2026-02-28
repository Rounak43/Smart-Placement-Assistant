// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbokqbds74PKhKSHAdBNNgEKerffi8cAU",
  authDomain: "smat-placement-platform.firebaseapp.com",
  projectId: "smat-placement-platform",
  storageBucket: "smat-placement-platform.firebasestorage.app",
  messagingSenderId: "868390484596",
  appId: "1:868390484596:web:4124012ef9e3ca58542f21",
  measurementId: "G-1F7BGYN90W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ⭐ Initialize Auth
export const auth = getAuth(app);

// ⭐ Initialize Google Auth Provider
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
