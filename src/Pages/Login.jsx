import React, { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase"; // ✅ Correct path
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

function Login() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          } 
          else {
            console.log("No user data found in Firestore.");
          }
        } 
        catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      } else {
        console.log("No user is logged in.");
      }
      setLoading(false); // ✅ important to stop showing "Loading..."
    });

    return () => unsubscribe();
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (!userDetails) return <p>No user logged in. Please log in.</p>;

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : userDetails ? (
        <div>
          <h1>Welcome, {userDetails.firstName}!</h1>
          <p>Email: {userDetails.email}</p>
          <p>Last Name: {userDetails.lastName}</p>
        </div>
      ) : (
        <p>No user logged in. Please log in.</p>
      )}
      <h2>Login Page</h2>
      <form>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <p className="forgot-password text-right">
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </p>

      <p className="forgot-password text-right">
        Forgot password? <a href="/reset-password">Reset Password</a>
      </p>

      <p className="forgot-password text-right">
        <a href="/">Go to Home</a>
      </p>
    </div>
  );
}

export default Login;