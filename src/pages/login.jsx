"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  auth,
  googleProvider,
  RecaptchaVerifier
} from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Login.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { BsTelephone } from "react-icons/bs";

export default function Login() {
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const router = useRouter();

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      const errors = {
        "auth/invalid-credential": "Invalid credentials",
        "auth/user-not-found": "User not found",
        "auth/wrong-password": "Incorrect password",
      };
      toast.error(errors[error.code] || error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast.error("Google login failed!");
    }
  };

  const sendOtp = () => {
    if (!phone) {
      toast.error("Enter your phone number.");
      return;
    }

    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
      size: "invisible",
    });

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, "+91" + phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpSent(true);
        toast.success("OTP sent!");
      })
      .catch(() => {
        toast.error("Failed to send OTP");
      });
  };

  const verifyOtp = () => {
    window.confirmationResult
      .confirm(otp)
      .then(() => {
        toast.success("Phone login successful!");
        setTimeout(() => router.push("/"), 1500);
      })
      .catch(() => {
        toast.error("Invalid OTP");
      });
  };

  return (
    <div className="login-page">
      <Navbar />
      <div className="login-container">
        <div className="login-mode-buttons">
          <button onClick={() => setMode("email")} className={mode === "email" ? "active" : ""}>
            <FcGoogle size={22} /> Email
          </button>
          <button onClick={() => setMode("phone")} className={mode === "phone" ? "active" : ""}>
            <BsTelephone size={18} /> Phone
          </button>
        </div>

        {mode === "email" && (
          <form onSubmit={handleEmailLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p className="or-divider">OR</p>
            <button type="button" onClick={handleGoogleLogin}>
              Continue with Google
            </button>
          </form>
        )}

        {mode === "phone" && (
          <div className="login-form">
            <input
              placeholder="Phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
            {otpSent && (
              <input
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />
            )}
            <div id="recaptcha"></div>
            {!otpSent ? (
              <button onClick={sendOtp}>Send OTP</button>
            ) : (
              <button onClick={verifyOtp}>Verify OTP</button>
            )}
          </div>
        )}

        <p>
          Don’t have an account?{" "}
          <a onClick={() => router.push("/signup")} style={{ cursor: "pointer" }}>
            Sign Up
          </a>
        </p>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
