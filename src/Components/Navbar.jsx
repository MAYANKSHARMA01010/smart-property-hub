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
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar" aria-label="Primary Navigation">
      <div className="navbarLeft">
        <h1 className="navbarTitle" onClick={() => router.push('/')}>
          SmartProperty Hub
        </h1>
      </div>

      <div className="navRight">
        <button className="navLinks" onClick={() => router.push('/')}>Home</button>
        <button className="navLinks" onClick={() => router.push('/about')}>About</button>
        <button className="navLinks" onClick={() => router.push('/all-listing')}>Properties</button>

        {user ? (
          <>
            <button className="navLinks" onClick={() => router.push('/profile')}>
              {user.displayName || user.email?.split('@')[0] || "Profile"}
            </button>
            <button className="navLinks logoutBtn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="navLinks loginBtn" onClick={() => router.push('/login')}>Login</button>
        )}

        <button
          className={`darkModeToggle ${darkMode ? 'active' : ''}`}
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
