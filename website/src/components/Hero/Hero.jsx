import React from 'react';
import './Hero.css';

const Hero = ({ business, loading }) => {
  // Use dynamic business info if available; fallback to default values.
  const businessName = business?.basic_info?.name || "Business Name";
  const phoneNumber = business?.basic_info?.phone || "Phone Not Available";
  // Use your provided hero image URL:
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
