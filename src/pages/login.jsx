"use client";

import React, { useState } from "react";
import "../styles/Login.css";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

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
        router.push("/");
      } 
      else {
        toast.error("User data not found in Firestore");
      }
    } 
    catch (error) {
      switch (error.code) {
        case "auth/too-many-requests":
          toast.error("Too many failed attempts. Please try again later.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        default:
          toast.error(`Login failed: ${error.message}`);
      }
    }
    setLoading(false);
  };


  return (
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
          className="login-input"
          disabled={loading}
        />
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
          <a onClick={() => router.push("/forgot-password")} className="login-link">Forgot Password?</a>
        </p>
        <p>
          <a onClick={() => router.push("/")} className="login-link">Go to Home</a>
        </p>
      </div>
    </div>
  );
}
