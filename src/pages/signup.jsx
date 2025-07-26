"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
      toast.error("⚠️ Please fill in all fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: name,
        name: name,
        email: user.email,
        phone: "No Data",
        gender: "None",
        createdAt: serverTimestamp(),
      });

      toast.success("🎉 Signup successful!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        toast.error("🚫 This email is already in use. Try logging in.");
      } else if (error.code === "auth/weak-password") {
        toast.error("🔐 Password should be at least 6 characters.");
      } else {
        toast.error(`❌ ${error.message}`);
      }
    }
  };

  const handleGoogleSignup = () => {
    toast("⚠️ Google Sign-In is coming soon!", { icon: "🔧" });
  };

  const handlePhoneSignup = () => {
    toast("📱 Phone Sign-Up coming soon!", { icon: "⌛" });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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
