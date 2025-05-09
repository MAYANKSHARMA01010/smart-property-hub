"use client";
import React, { useState } from "react";
import "../styles/globals.css";
import "../styles/SignUp.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
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

      alert("User Registered Successfully!!");

      setEmail("");
      setFname("");
      setLname("");
      setPassword("");
      router.push("/login");
    } catch (error) {
      console.error("Registration Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default SignUp;
