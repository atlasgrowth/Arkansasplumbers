import React, { useState } from 'react';
import './Header.css';

// Option 1: Minimalist header with horizontal navigation
export const HeaderDesign1 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  return (
    <header className="header-design1">
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

// Option 2: Centered logo with navigation below
export const HeaderDesign2 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  return (
    <header className="header-design2">
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
    </header>
  );
};

// Option 3: Transparent header with overlay navigation
export const HeaderDesign3 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  return (
    <header className="header-design3">
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

// Master Header component: Change selectedVariant to 1, 2, or 3 to switch design.
const Header = (props) => {
  const selectedVariant = 3; // Change to 2 or 3 for a different design.
  if (selectedVariant === 1) return <HeaderDesign1 {...props} />;
  if (selectedVariant === 2) return <HeaderDesign2 {...props} />;
  if (selectedVariant === 3) return <HeaderDesign3 {...props} />;
  return <HeaderDesign1 {...props} />;
};

export default Header;
