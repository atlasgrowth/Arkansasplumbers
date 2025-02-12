import React from 'react';
import './Hero.css';

const Hero = ({ siteId }) => {
  // For demo purposes, we use static values.
  // In a real scenario, you could fetch data based on siteId.
  const businessName = "Your Business Name";
  const phoneNumber = "(123) 456-7890";
  const backgroundImage = "https://source.unsplash.com/1600x900/?business";

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
