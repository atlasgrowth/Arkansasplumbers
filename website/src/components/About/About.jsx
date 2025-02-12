// components/About/About.jsx
import React from 'react';
import './About.css';

const About = ({ business, loading }) => {
  if (loading) return <div className="about-loading">Loading...</div>;

  const {
    name = "",
    phone = "",
    city = "",
    state = "",
    area_service = false,
    rating = 0,
    working_hours = {}
  } = business?.basic_info || {};

  // Create location text with fallbacks
  const locationText = city 
    ? `${city}, ${state}`
    : "your local area";

  // Parse working hours if they exist
  let workingHoursText = "Available when you need us";
  if (typeof working_hours === 'object' && Object.keys(working_hours).length > 0) {
    const isAlways = Object.values(working_hours).every(hours => hours === "Open 24 hours");
    workingHoursText = isAlways ? "Open 24/7" : "Contact us for current hours";
  }

  return (
    <section className="about" id="about">
      <div className="about-background"></div>
      <div className="about-content">
        <div className="about-text">
          <span className="about-eyebrow">About Us</span>
          <h2 className="about-title">
            Your Trusted Plumbing Experts in
            <span className="location-highlight">{locationText}</span>
          </h2>

          <div className="about-description">
            <p>
              At {name}, we're committed to providing exceptional plumbing services 
              to {city ? `the ${city} community` : 'our community'} with reliability 
              and professionalism that you can count on.
            </p>

            <div className="about-features">
              <div className="feature-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Service Area</h3>
                <p>{area_service ? "Extended service area available" : `Serving ${locationText}`}</p>
              </div>

              <div className="feature-card">
                <i className="fas fa-clock"></i>
                <h3>Availability</h3>
                <p>{workingHoursText}</p>
              </div>

              <div className="feature-card">
                <i className="fas fa-phone"></i>
                <h3>Contact Us</h3>
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="phone-link">
                  {phone}
                </a>
              </div>
            </div>

            <div className="about-badges">
              <div className="badge">
                <i className="fas fa-shield-alt"></i>
                Licensed & Insured
              </div>
              <div className="badge">
                <i className="fas fa-tools"></i>
                Expert Technicians
              </div>
              <div className="badge">
                <i className="fas fa-star"></i>
                Satisfaction Guaranteed
              </div>
            </div>
          </div>

          <div className="about-cta">
            <a href="#services" className="about-button primary">
              <i className="fas fa-wrench"></i>
              Our Services
            </a>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="about-button secondary">
              <i className="fas fa-phone"></i>
              Call Now
            </a>
          </div>
        </div>

        <div className="about-image">
          <div className="image-container">
            <div className="stats-card">
              <div className="stat">
                <span className="stat-number">{rating}</span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;