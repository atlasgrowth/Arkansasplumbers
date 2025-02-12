import React from 'react';
import './Hero.css';

const Hero = ({ business, loading }) => {
  if (loading) return <div className="hero-loading">Loading...</div>;

  const {
    name = "Business Name",
    phone = "",
    rating = 0,
  } = business?.basic_info || {};

  const totalReviews = business?.review_trends?.total_reviews || 0;
  const showReviews = parseFloat(rating) >= 4.0 || totalReviews >= 3;

  return (
    <section className="hero" id="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text-content animate-in">
          <h1 className="hero-title">
            <span className="hero-subtitle">Professional & Reliable</span>
            <span className="hero-main-title">{name}</span>
          </h1>

          {/* Removed the "24/7 Emergency Service" text */}
          <p className="hero-description">
            Expert plumbing solutions. Your trusted local plumber for all repairs and installations.
          </p>

          {showReviews && (
            <div className="hero-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i 
                    key={index}
                    className={`fas fa-star ${index < Math.floor(rating) ? 'active' : ''}`}
                  />
                ))}
              </div>
              <span className="rating-text">
                {rating} out of 5 ({totalReviews} reviews)
              </span>
            </div>
          )}

          <div className="hero-cta">
            {phone && (
              <a 
                href={`tel:${phone.replace(/[^0-9]/g, '')}`}
                className="cta-button primary"
              >
                <i className="fas fa-phone"></i>
                Call Now
              </a>
            )}
            <a href="#services" className="cta-button secondary">
              <i className="fas fa-tools"></i>
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
