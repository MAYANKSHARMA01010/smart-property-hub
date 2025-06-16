"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/globals.css";
import '../styles/Navbar.css';

import { auth, db } from '../lib/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="navbarLeft">
        <h1 className="navbarTitle" onClick={() => router.push('/')}>
          SmartProperty Hub
        </h1>
      </div>

      <div className="navbarIcons">
        <button
          className={`darkModeToggle ${darkMode ? 'active' : ''}`}
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        <button className="hamburger" onClick={toggleMenu}>☰</button>
      </div>

      <div className={`navRight ${menuOpen ? 'showMenu' : ''}`}>
        <button className="navLinks" onClick={() => router.push('/')}>Home</button>
        <button className="navLinks" onClick={() => router.push('/about')}>About</button>
        <button className="navLinks" onClick={() => router.push('/all-listing')}>Properties</button>

        {user ? (
          <button className="navLinks" onClick={() => router.push('/profile')}>
            {userData?.fullName?.split(" ")[0] || "Profile"}
          </button>
        ) : (
          <button className="navLinks loginBtn" onClick={() => router.push('/login')}>Login</button>
        )}
        <button
          className={`darkModeToggle ${darkMode ? 'active' : ''}`}
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
      
    </nav>
  );
}
