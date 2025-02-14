
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = ({ business }) => {
  const { name = '', phone = '', latitude, longitude } = business?.basic_info || {};
  const currentYear = new Date().getFullYear();

  const mapSrc = latitude && longitude
    ? `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
    : '';

  return (
    <footer className="footer">
      <div className="footer-content">
        {mapSrc && (
          <div className="footer-section map-section">
            <h4>Our Location</h4>
            <iframe
              src={mapSrc}
              width="300"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        )}
        <div className="footer-section">
          <h3>{name || 'Professional Plumbing Services'}</h3>
          {phone && (
            <a
              href={`tel:${phone.replace(/[^0-9]/g, '')}`}
              className="footer-phone"
            >
              <i className="fas fa-phone"></i> {phone}
            </a>
          )}
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/residential">Residential</Link>
            <Link to="/commercial">Commercial</Link>
          </nav>
        </div>
        <div className="footer-section">
          <h4>Available 24/7</h4>
          <p>Emergency Plumbing Services</p>
          <p>Professional & Reliable</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {currentYear} {name || 'Professional Plumbing'}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
