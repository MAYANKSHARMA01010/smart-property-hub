"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import "../styles/signup.css"; // ✅ Using same style as SignupPage

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      const errors = {
        "auth/invalid-credential": "Invalid credentials",
        "auth/user-not-found": "User not found",
        "auth/wrong-password": "Incorrect password",
      };
      toast.error(errors[error.code] || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    toast.error("Google Sign-In not available yet.");
  };

  const handlePhoneLogin = () => {
    toast.error("Phone Sign-In not implemented.");
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <main className="signup-page">
        <div className="signup-container">
          <h2>Log In</h2>

          <form onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleLogin} className="google-button">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button type="button" onClick={handlePhoneLogin} className="phone-button">
            📱 Continue with Phone
          </button>

          <p className="login-link">
            Don’t have an account?{" "}
            <span className="link" onClick={() => router.push("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
