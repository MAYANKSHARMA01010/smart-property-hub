"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/Navbar.css';

import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

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
    <>
      <header className="navbar">
        <div className="navbar-left">
          <button className="menu-button" onClick={() => setOpen(true)}>☰</button>
          <h1 className="navbar-title">SmartProperty Hub</h1>
        </div>
        <div className="navbar-right">
          {user ? (
            <>
              <span className="user-info">{user.email}</span>
              <button className="login-button" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link href="/login">
              <button className="login-button">Login</button>
            </Link>
          )}
          <button className="dark-mode-button" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <div className={`overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)}></div>

      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <button className="close-button" onClick={() => setOpen(false)}>✖</button>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/About">About</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/get-started">Get started</Link>
          <Link href="/past-programs">Past programs</Link>
        </nav>
      </aside>
    </>
  );
}
