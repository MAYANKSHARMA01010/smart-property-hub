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
    <section className="contactUs">
      <div className="container">
        <h1 className="contactUs-title">
          🎧 Get <span className="highlight">In Touch</span>
        </h1>

        <div className="contactUs-content">
          <div className="contactUs-image">
            <img src="/getInTouchImg.jpeg" alt="Contact Illustration" />
          </div>

          <form className="contactUs-form" onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
              />
            </div>

            <div className="input-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <FaPhone className="icon" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                autoComplete="tel"
              />
            </div>

            <div className="input-group textarea-group">
              <FaComment className="icon" />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message 📩
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
