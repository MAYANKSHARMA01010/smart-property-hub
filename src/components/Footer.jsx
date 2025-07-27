import React from 'react';
import { useRouter } from 'next/navigation';
import '../styles/Footer.css';
import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaTelegram,
  FaLocationArrow,
} from 'react-icons/fa';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left - Brand Info */}
        <div className="footer-brand">
          <h3>SmartProperty Hub</h3>
          <p>Helping you make smarter real estate decisions.</p>
        </div>

        {/* Center - Navigation Links */}
        <div className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => router.push('/')}>Home</li>
            <li onClick={() => router.push('/about')}>About</li>
            <li onClick={() => router.push('/all-listing')}>Properties</li>
            <li onClick={() => router.push('/')}>FAQs</li>
          </ul>
        </div>

        {/* Right - Contact Info */}
        <address className="footer-contact">
          <h4>Contact Us</h4>
          <p><FaLocationArrow /> Sonipat, Haryana, India - 131021</p>
          <p><FaEnvelope /> <a href="mailto:smartpropertyhub@email.com">smartpropertyhub@email.com</a></p>
          <div className="footer-socials" aria-label="Social links">
            <a
              href="https://www.linkedin.com/in/mayanksharma3369/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/MAYANKSHARMA01010"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:smartpropertyhub@email.com"
              title="Email"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://t.me/your-telegram"
              target="_blank"
              rel="noopener noreferrer"
              title="Telegram"
            >
              <FaTelegram />
            </a>
          </div>
        </address>
      </div>

      <hr className="footer-divider" />
      <p className="footer-copy">&copy; {new Date().getFullYear()} SmartProperty Hub. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
