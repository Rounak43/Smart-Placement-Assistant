import { useState } from "react";
import GoogleLogin from "../components/GoogleLogin";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {

  const [formdata, setFormdata] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPass: ""
  });

  const [signupError, setSignupError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (event) => {
    setFormdata({
      ...formdata,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSignupError("");

    // ✅ Check if passwords match
    if (formdata.password !== formdata.confirmPass) {
      setSignupError("Passwords do not match");
      return;
    }

    try {

      // 🔥 Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formdata.email,
        formdata.password
      );

      const user = userCredential.user;

      // 🔥 Set the Auth user's displayName so UI can show the username
      if (formdata.fullname) {
        await updateProfile(user, { displayName: formdata.fullname });
      }

      // 🔥 Store extra data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullname: formdata.fullname,
        email: formdata.email,
        role: "student",
        createdAt: new Date()
      });

      console.log("User stored in Firestore");

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setSignupError("Email is already in use");
      } else if (error.code === 'auth/weak-password') {
        setSignupError("Password should be at least 6 characters");
      } else {
        setSignupError(error.message);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p className="subtitle">Create your account to get started</p>
        {signupError && <p className="error-message">{signupError}</p>}


        <input
          type="text"
          name="fullname"
          value={formdata.fullname}
          placeholder="Enter Your Full Name"
          onChange={handleInputChange}
          autoComplete="off"
        />

        <input
          type="email"
          name="email"
          value={formdata.email}
          placeholder="Enter Your Email"
          onChange={handleInputChange}
          autoComplete="off"
        />

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formdata.password}
            placeholder="Create Password"
            onChange={handleInputChange}
            autoComplete="new-password"
            style={{ width: '100%', paddingRight: '40px' }}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              margin: '0',
              boxShadow: 'none'
            }}
          >
            {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPass"
            value={formdata.confirmPass}
            placeholder="Confirm Password"
            onChange={handleInputChange}
            autoComplete="new-password"
            style={{ width: '100%', paddingRight: '40px' }}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              margin: '0',
              boxShadow: 'none'
            }}
          >
            {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
          </button>
        </div>

        <button type="submit">Sign Up</button>

        <h3>OR Sign Up Using</h3>
        <GoogleLogin />

      </form>

    </>
  );
}
