"use client";

import React, { useState } from "react";
import "../styles/Login.css";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } 
      else {
        toast.error("User data not found in Firestore");
      }
    } 
    catch (error) {
      console.log("Login error code:", error.code);
      const errorMessages = {
        "auth/too-many-requests": "Too many login attempts. Please try again later.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/user-not-found": "No user found with this email.",
        "auth/invalid-email": "Invalid email address.",
        "auth/invalid-credential": "Invalid credentials. Please try again or check your emial/password.",
      };

      toast.error(errorMessages[error.code] || "Login failed. Please try again.");
    }
    setLoading(false);
  };


  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input password-input"
            disabled={loading}
          />
          <div className="login-link">
            <a onClick={() => router.push("/forgot-password")} className="login-link">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>

        <div className="login-links">
          <p>
            New user?{" "}
            <a onClick={() => router.push("/signup")} className="login-link">Register Here</a>
          </p>
          <p>
            <a onClick={() => router.push("/")} className="login-link">Go to Home</a>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
    </div>
  );
}
