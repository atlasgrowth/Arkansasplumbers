
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ business, loading }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const businessName = business?.basic_info?.name || "Loading...";
  const phone = business?.basic_info?.phone || "";
  const rating = parseFloat(business?.basic_info?.rating) || 0;
  const showReviews = rating >= 4.0;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          {loading ? "Loading..." : businessName}
        </div>

        <nav className="nav-menu">
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="nav-link">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="nav-link">About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="nav-link">Services</a>
          {showReviews && (
            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className="nav-link">
              Reviews
              <span className="review-badge">{rating}★</span>
            </a>
          )}
          <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} className="nav-link">Contact</a>
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
