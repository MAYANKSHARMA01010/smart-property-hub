import React from 'react';
import "../styles/HomePage.css";
import "../styles/globals.css";
import Navbar from '@/Components/Navbar';

export default function Home() {
  return (
    <div className='HomePage'>
      <Navbar />
      <h1>HelloWorld</h1>
    </div>
  );
}
