'use client';

import React from 'react';
import '../styles/contactUs.css';
import { FaUser, FaEnvelope, FaPhone, FaComment } from 'react-icons/fa';

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  return (
    <div className="contactUs">
      <div className="contactUs-wrapper">
        <div className="contactUs-left">
          <img src="/contact-illustration.svg" alt="Contact Illustration" />
        </div>
        <div className="contactUs-right">
          <h1><span>🎧</span> Get <span className="highlight">In Touch</span></h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <FaUser className="icon" />
              <input type="text" placeholder="Name" required />
            </div>
            <div className="input-group">
              <FaEnvelope className="icon" />
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-group">
              <FaPhone className="icon" />
              <input type="tel" placeholder="Phone" required />
            </div>
            <div className="input-group">
              <FaComment className="icon" />
              <textarea placeholder="Message" required></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit 📩</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
