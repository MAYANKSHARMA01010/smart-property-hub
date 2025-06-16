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
        <address className="footer-links">
          <p><FaLocationArrow aria-hidden="true" /> Sonipat, Haryana, India - 131021</p>
          <p><FaEnvelope aria-hidden="true" /> <a href="mailto:smartpropertyhub@email.com" className="email-link">smartpropertyhub@email.com</a></p>
        </address>
        <div className="footer-socials" aria-label="Social media links">
          <a
            href="https://www.linkedin.com/in/mayanksharma3369/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/MAYANKSHARMA01010"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:smartpropertyhub@email.com"
            aria-label="Email"
            title="Email"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://t.me/your-telegram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            title="Telegram"
          >
            <FaTelegram />
          </a>
        </div>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} SmartProperty Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
