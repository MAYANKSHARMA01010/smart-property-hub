"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/globals.css";
import '../styles/Navbar.css';

import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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

        {loading ? (
          <div className="navLinks">Loading...</div>
        ) : user ? (
          <button className="navLinks" onClick={() => router.push('/profile')}>
            {user.displayName?.split(" ")[0] || "Profile"}
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
