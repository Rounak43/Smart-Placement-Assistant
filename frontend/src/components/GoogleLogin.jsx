import { auth, provider, db } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";

function GoogleLogin() {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user details in Firestore if they are new
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          fullname: user.displayName,
          email: user.email,
          role: "student",
          createdAt: new Date()
        });
        console.log("New User stored in Firestore");
      }

      console.log("Logged in:", user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        cursor: "pointer",
        fontSize: "16px"
      }}
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );
}

export default GoogleLogin;

