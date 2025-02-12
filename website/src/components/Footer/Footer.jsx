
import React from 'react';
import './Footer.css';

const Footer = ({ business }) => {
  const { name = "", phone = "" } = business?.basic_info || {};
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{name || "Professional Plumbing Services"}</h3>
          {phone && (
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="footer-phone">
              <i className="fas fa-phone"></i> {phone}
            </a>
          )}
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-section">
          <h4>Available 24/7</h4>
          <p>Emergency Plumbing Services</p>
          <p>Professional & Reliable</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} {name || "Professional Plumbing"}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
