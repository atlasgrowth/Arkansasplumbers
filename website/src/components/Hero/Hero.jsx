import React from 'react';
import './Hero.css';

// Option 1: Classic hero with centered overlay
export const HeroDesign1 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  const phoneNumber = business?.basic_info?.phone || "Phone Not Available";
  const backgroundImage = "https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg";

  return (
    <section className="hero-design1" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay">
        <h1 className="hero-title">{businessName}</h1>
        <p className="hero-phone">{phoneNumber}</p>
        <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="hero-button">Call Now</a>
      </div>
    </section>
  );
};

// Option 2: Full-width background with left-aligned text
export const HeroDesign2 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  const phoneNumber = business?.basic_info?.phone || "Phone Not Available";
  const backgroundImage = "https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg";

  return (
    <section className="hero-design2" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content-left">
          <h1 className="hero-title">{businessName}</h1>
          <p className="hero-phone">{phoneNumber}</p>
          <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="hero-button">Call Now</a>
        </div>
      </div>
    </section>
  );
};

// Option 3: Split layout hero (image on one side, text on the other)
export const HeroDesign3 = ({ business, loading }) => {
  const businessName = business?.basic_info?.name || "Business Name";
  const phoneNumber = business?.basic_info?.phone || "Phone Not Available";
  const backgroundImage = "https://assets.cdn.filesafe.space/A9rd4HdLD0sTvRuuQFZl/media/651501775cf2e93f16638cf9.jpeg";

  return (
    <section className="hero-design3">
      <div className="hero-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      <div className="hero-content">
        <h1 className="hero-title">{businessName}</h1>
        <p className="hero-phone">{phoneNumber}</p>
        <a href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`} className="hero-button">Call Now</a>
      </div>
    </section>
  );
};

// Master Hero component: Change selectedVariant to 1, 2, or 3 to choose a design.
const Hero = (props) => {
  const selectedVariant = 1; // Change this value to 2 or 3 for a different design
  if (selectedVariant === 1) return <HeroDesign1 {...props} />;
  if (selectedVariant === 2) return <HeroDesign2 {...props} />;
  if (selectedVariant === 3) return <HeroDesign3 {...props} />;
  return <HeroDesign1 {...props} />;
};

export default Hero;
