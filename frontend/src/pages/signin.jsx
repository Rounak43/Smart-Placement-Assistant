import { useState } from "react";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import GoogleLogin from "../components/GoogleLogin";

export default function Signin() {

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoginError("");
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log("Login successful:", userCredential.user);
        // Remove alert, dashboard redirect naturally handles success

      } catch (error) {
        if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
          setLoginError("Incorrect email or password");
        } else {
          setLoginError("Login failed. Please try again.");
        }
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <p className="subtitle">
          Welcome back! Please login to your account
        </p>
        {loginError && <p style={{ color: '#ef4444', margin: '0', fontSize: '0.9rem', textAlign: 'center' }}>{loginError}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter Your Email"
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter Password"
        />
        {formik.errors.password && <p>{formik.errors.password}</p>}

        <button type="submit">Login</button>

        <h3>OR Sign in Using</h3>
        <GoogleLogin />
      </form>
    </>
  );
}
