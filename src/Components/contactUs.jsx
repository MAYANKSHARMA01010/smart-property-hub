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
        <h1>
          <span role="img" aria-label="headphone">🎧</span> Get{' '}
          <span className="highlight">In Touch</span>
        </h1>

        <div className="twoSides">
          <div className="contactUs-left">
            <img src="/getInTouchImg.jpeg" alt="Contact Illustration" />
          </div>

          <div className="contactUs-right">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="icon" />
                <input type="text" name="name" placeholder="Name" required />
              </div>

              <div className="input-group">
                <FaEnvelope className="icon" />
                <input type="email" name="email" placeholder="Email" required />
              </div>

              <div className="input-group">
                <FaPhone className="icon" />
                <input type="tel" name="phone" placeholder="Phone" required />
              </div>

              <div className="input-group">
                <FaComment className="icon" />
                <textarea name="message" placeholder="Message" required></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Submit 📩
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
