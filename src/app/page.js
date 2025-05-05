import React from 'react';
import "../styles/HomePage.css";
import "../styles/globals.css";
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Home() {
  return (
    <div className='HomePage'>
      <Navbar />

      <div className="content">
        <h1>HelloWorld</h1>
        <h1>Welcome to SmartProperty Hub</h1>
      </div>

      <Footer />
    </div>
  );
}
