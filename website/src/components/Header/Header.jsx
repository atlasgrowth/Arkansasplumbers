import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">CoolBusiness</div>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/Arkansasplumbers/">Home</a></li>
            <li><a href="/Arkansasplumbers/#about">About</a></li>
            <li><a href="/Arkansasplumbers/#services">Services</a></li>
            <li><a href="/Arkansasplumbers/#reviews">Reviews</a></li>
            <li><a href="/Arkansasplumbers/#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="hamburger"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
