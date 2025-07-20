"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db, googleProvider, RecaptchaVerifier } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/signup.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FcGoogle } from "react-icons/fc";
import { BsTelephone } from "react-icons/bs";

export default function SignUp() {
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        fullName,
        phone: "",
        bio: "",
        photo: "",
        location: "",
      });

      toast.success("User Registered Successfully!");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      const errors = {
        "auth/email-already-in-use": "Email already in use.",
        "auth/invalid-email": "Invalid email.",
        "auth/weak-password": "Weak password.",
      };
      toast.error(errors[error.code] || error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        fullName: user.displayName || "",
        phone: user.phoneNumber || "",
        bio: "",
        photo: user.photoURL || "",
        location: "",
      });

      toast.success("Signed up with Google!");
      setTimeout(() => router.push("/"), 1500);
    } catch (error) {
      toast.error("Google signup failed!");
    }
  };

  const sendOtp = () => {
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
      .then(async (result) => {
        const user = result.user;
        await setDoc(doc(db, "users", user.uid), {
          email: "",
          fullName,
          phone,
          bio: "",
          photo: "",
          location: "",
        });
        toast.success("Phone verified!");
        setTimeout(() => router.push("/"), 1500);
      })
      .catch(() => {
        toast.error("Invalid OTP");
      });
  };

  return (
    <div className="signup-page">
      <Navbar />
      <div className="signup-container">
        <div className="signup-mode-buttons">
          <button onClick={() => setMode("email")} className={mode === "email" ? "active" : ""}>
            <FcGoogle size={24} /> Email
          </button>
          <button onClick={() => setMode("phone")} className={mode === "phone" ? "active" : ""}>
            <BsTelephone size={20} /> Phone
          </button>
        </div>

        {mode === "email" && (
          <form onSubmit={handleEmailSignup} className="signup-form">
            <input
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up with Email</button>
            <p className="or-divider">OR</p>
            <button type="button" onClick={handleGoogleSignup}>
              Continue with Google
            </button>
          </form>
        )}

        {mode === "phone" && (
          <div className="signup-form">
            <input
              placeholder="Full name"
              onChange={(e) => setFullName(e.target.value)}
              required
            />
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
          Already have an account?{" "}
          <a
            onClick={() => router.push("/login")}
            style={{ cursor: "pointer" }}
          >
            Login
          </a>
        </p>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
