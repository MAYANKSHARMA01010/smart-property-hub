'use client';

import React from 'react';
import '../styles/globals.css';
import '../styles/profile.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function Profile() {
  return (
    <div className="profile">
      <Navbar />

      <div className="profile-container">
        <h1 className="profile-heading">Welcome to Your Profile</h1>

        <div className="profileInfo">
          <img src="/images/profile.jpg" alt="Profile" className="profileImage" />
          
          <div className="profileDetails">
            <h3>John Doe</h3>
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Phone:</strong> +91-9876543210</p>
            <p><strong>Location:</strong> New Delhi, India</p>
            <p><strong>Bio:</strong> Passionate developer with a love for coding and innovation.</p>
            <p><strong>Skills:</strong> JavaScript, React, Firebase</p>
            <p><strong>Education:</strong> B.Tech in Computer Science</p>
          </div>
        </div>

        <div className="profileActions">
          <button className="editProfile">Edit Profile</button>
          <button className="logout">Logout</button>
        </div>

        <div className="socialLinks">
          <h4>Connect</h4>
          <a href="https://linkedin.com/in/example" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/example" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://x.com/example" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://portfolio.example.com" target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
