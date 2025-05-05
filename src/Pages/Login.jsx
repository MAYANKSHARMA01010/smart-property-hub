"use client";

import React, { useState } from "react";
import "../styles/login.css";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        alert("Login successful!");
        router.push("/");
      } else {
        alert("User data not found in Firestore");
      }

    } catch (error) {
      // alert(`Error logging in:, ${error.message}`);
      alert(`Error: ${error.message}`);
    }
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
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Submit</button>
      </form>

      <div className="login-links">
        <p>
          New user?{" "}
          <a onClick={() => router.push("/signup")} className="login-link">
            Register Here
          </a>
        </p>
        <p>
          <a onClick={() => router.push("/forgot-password")} className="login-link">
            Forgot Password?
          </a>
        </p>
        <p>
          <a onClick={() => router.push("/")} className="login-link">
            Go to Home
          </a>
        </p>
      </div>
    </div>
  );
}
