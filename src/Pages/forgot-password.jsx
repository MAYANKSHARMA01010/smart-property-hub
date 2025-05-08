"use client";

import React, { useState } from "react";
import "../styles/globals.css";
import "../styles/forgot-password.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No user found with this email.");
          break;
        case "auth/invalid-email":
          setError("Invalid email format.");
          break;
        default:
          setError(`Failed to send reset email: ${err.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="forgotpassword">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="login-links">
        <p>
          <a onClick={() => router.push("/login")} className="login-link">
            Back to Login
          </a>
        </p>
        <p>
          <a onClick={() => router.push("/signup")} className="login-link">
            Don't have an account? Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
