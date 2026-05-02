import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <div className="logo-icon">🔗</div>
              <span className="logo-text">CertiChain</span>
            </div>
            <p>Secure, transparent, and tamper-proof certificate verification powered by blockchain technology.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#docs">Documentation</a></li>
              <li><a href="#api">API</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <ul>
              <li>Email: info@certichain.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: Tech Park, Salt Lake, Kolkata</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 CertiChain. All rights reserved. Built with Blockchain Technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;