"use client";
import React, { useState } from "react";
import "../styles/SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;     
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          fullName: `${fname} ${lname}`,
          photo: "",
          phone: "",
          location: "",
          bio: "",
        });
      }

      setTimeout(() => {
        router.push("/login");
      }, 4000);

      toast.success("User Registered Successfully!!");
    } 
    catch (error) {
      console.error("Registration Error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please use a different email.");
      } 
      else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address. Please enter a valid email.");
      } 
      else if (error.code === "auth/weak-password") {
        toast.error("Weak password. Please enter a stronger password.");
      }
      else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleRegister}>
        <h3>Sign Up</h3>

        <div className="mb-3">
          <label>First name</label>
          <input type="text" className="form-control" placeholder="First name" onChange={(e) => setFname(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Last name</label>
          <input type="text" className="form-control" placeholder="Last name" onChange={(e) => setLname(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label>Confirm Password</label>
          <input type="password" className="form-control" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </div>

        <p className="text-right">
          Already registered?{" "}
          <a onClick={() => router.push("/login")} style={{ cursor: "pointer" }}><span>Login</span></a>
        </p>

        <p className="text-right">
          <a onClick={() => router.push("/")} style={{ cursor: "pointer" }}><span>Go to Home</span></a>
        </p>
      </form>
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

export default SignUp;
