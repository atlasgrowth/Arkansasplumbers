// components/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ business, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const businessName = business?.basic_info?.name || "Loading...";
  const phone = business?.basic_info?.phone || "";
  const rating = parseFloat(business?.basic_info?.rating) || 0;
  const reviewCount = parseInt(business?.review_trends?.total_reviews) || 0;
  const showReviews = rating >= 4.0 || reviewCount >= 3;

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          {loading ? "Loading..." : businessName}
        </div>

        <button className="mobile-menu-button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className="fas fa-ellipsis-v"></i>
        </button>
        <nav className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="/#hero" className="nav-link">Home</a>
          <a href="/#about" className="nav-link">About</a>
          <div className="services-dropdown">
            <a href="/#services" className="nav-link">Services</a>
            <div className="services-dropdown-content">
              <a href="/residential" className="nav-link">Residential</a>
              <a href="/commercial" className="nav-link">Commercial</a>
              <a href="/residential#emergency" className="nav-link">Emergency</a>
            </div>
          </div>
          {showReviews && (
            <a href="/#reviews" className="nav-link">
              Reviews
              <span className="review-badge">{rating}★</span>
            </a>
          )}
          <a href="/#contact" className="nav-link">Contact</a>
        </nav>

        {phone && (
          <a 
            href={`tel:${phone.replace(/[^0-9]/g, '')}`} 
            className="phone-button"
          >
            <i className="fas fa-phone"></i>
            <span>{phone}</span>
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;