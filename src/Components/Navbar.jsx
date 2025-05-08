"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title" onClick={() => router.push('/')}>
          SmartProperty Hub
        </h1>
      </div>
      <div className="navbar-right">
        <button className="login-button navLinks" onClick={() => router.push('/')}>Home</button>
        <button className="login-button navLinks" onClick={() => router.push('/about')}>About</button>

        {user ? (
          <>
            <button className="login-button navLinks" onClick={() => router.push('/profile')}>Profile</button>
            <button className="login-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login-button" onClick={() => router.push('/login')}>Login</button>
        )}

        <button className="dark-mode-button" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}