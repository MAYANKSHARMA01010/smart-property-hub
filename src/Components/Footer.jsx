import React from 'react';
import '../styles/Footer.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaTelegram, FaLocationArrow } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <h3>SmartProperty Hub</h3>
          <p>Helping you find smarter real estate decisions.</p>
        </div>
        <div className="footer-links">
          <p><FaLocationArrow /> Pune, India - 412206</p>
          <p><FaEnvelope /> smartpropertyhub@email.com</p>
        </div>
        <div className="footer-socials">
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaGithub /></a>
          <a href="#"><FaEnvelope /></a>
          <a href="#"><FaTelegram /></a>
        </div>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} SmartProperty Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
