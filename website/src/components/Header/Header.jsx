import React from 'react';
import './Header.css';

const Header = ({ business, loading }) => {
  // Use the business name if available; otherwise, a placeholder is shown.
  const businessName = business?.basic_info?.name || "Business Name";

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">{businessName}</div>
        <nav className="nav">
          <ul>
            <li><a href="/Arkansasplumbers/">Home</a></li>
            <li><a href="/Arkansasplumbers/#about">About</a></li>
            <li><a href="/Arkansasplumbers/#services">Services</a></li>
            <li><a href="/Arkansasplumbers/#reviews">Reviews</a></li>
            <li><a href="/Arkansasplumbers/#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
