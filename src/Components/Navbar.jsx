"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import "../styles/globals.css";
import '../styles/Navbar.css';

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
      router.push('/');  // Redirect on logout
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar" aria-label="Primary Navigation">
      <div className="navbar-left">
        <h1 className="navbar-title" onClick={() => router.push('/')}>
          SmartProperty Hub
        </h1>
      </div>

      <div className="navbar-right">
        <button className="nav-link" onClick={() => router.push('/')}>Home</button>
        <button className="nav-link" onClick={() => router.push('/about')}>About</button>

        {user ? (
          <>
            <button className="nav-link" onClick={() => router.push('/profile')}>
              {user.displayName || user.email?.split('@')[0] || "Profile"}
            </button>
            <button className="nav-link logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="nav-link login-btn" onClick={() => router.push('/login')}>Login</button>
        )}

        <button
          className={`dark-mode-toggle ${darkMode ? 'active' : ''}`}
          aria-label="Toggle dark mode"
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
