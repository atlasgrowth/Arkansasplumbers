import React from 'react';
import './Hero.css';

const Hero = () => {
  // Sample static data—you can later make these dynamic or pass them as props.
  const businessName = "Your Business Name";
  const phoneNumber = "(123) 456-7890";
  const backgroundImage = "https://source.unsplash.com/1600x900/?business"; // stock photo URL

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
