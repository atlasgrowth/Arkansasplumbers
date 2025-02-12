import React from 'react';
import './Hero.css';

const Hero = ({ siteId }) => {
  // For now, static content is used.
  const businessName = "Cool Business Inc.";
  const phoneNumber = "(800) 123-4567";
  const backgroundImage = "https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg";

  return (
    <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay">
        <h1 className="hero-title">{businessName}</h1>
        <p className="hero-phone">{phoneNumber}</p>
        <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="hero-button">Call Now</a>
      </div>
    </section>
  );
};

export default Hero;
