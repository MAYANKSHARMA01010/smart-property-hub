"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; // 🔧 serverTimestamp added
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/signup.css";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      toast.success("Signup successful!");
      router.push("/");
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: user.email,
        phone: "No Data",
        gender: "None",
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.message || "Signup failed");
    }
  };

  const handleGoogleSignup = async () => {
    toast.error("Google Sign-In not available yet.");
  };

  const handlePhoneSignup = async () => {
    toast.error("Phone Sign-Up not implemented.");
  };

  return (
    <>
      <Toaster position="top-right" />
      <Navbar />

      <main className="signup-page">
        <div className="signup-container">
          <h2>Create Account</h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGoogleSignup} className="google-button">
            <FcGoogle size={20} />
            Continue with Google
          </button>

          <button type="button" onClick={handlePhoneSignup} className="phone-button">
            📱 Continue with Phone
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <span className="link" onClick={() => router.push("/login")}>
              Log in
            </span>
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
