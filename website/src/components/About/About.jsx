
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
          <p className="about-intro">
            At {name}, we're committed to providing exceptional plumbing services 
            to {city ? `the ${city} community` : 'our community'} with reliability 
            and professionalism that you can count on.
          </p>

          <div className="about-grid">
            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-medal"></i>
              </div>
              <h3>Professional Excellence</h3>
              <p>Our team of certified plumbers brings years of expertise to every job</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>24/7 Emergency Service</h3>
              <p>We're here when you need us most, any time day or night</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-tools"></i>
              </div>
              <h3>Complete Solutions</h3>
              <p>From minor repairs to major installations, we do it all</p>
            </div>

            <div className="about-card">
              <div className="card-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <h3>Competitive Pricing</h3>
              <p>Fair and transparent pricing for all our services</p>
            </div>
          </div>

          <div className="about-highlights">
            <div className="highlight">
              <i className="fas fa-check-circle"></i>
              <span>Licensed & Insured</span>
            </div>
            <div className="highlight">
              <i className="fas fa-check-circle"></i>
              <span>Same Day Service</span>
            </div>
            <div className="highlight">
              <i className="fas fa-check-circle"></i>
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>

          <div className="about-contact">
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="contact-button">
              <i className="fas fa-phone"></i>
              Call Now: {phone}
            </a>
            <div className="contact-hours">
              <i className="fas fa-clock"></i>
              {workingHoursText}
            </div>
          </div>
        </div>

        <div className="about-image">
          <div className="rating-card">
            <div className="rating-stars">
              {'★'.repeat(Math.floor(rating))}
              {'☆'.repeat(5 - Math.floor(rating))}
            </div>
            <div className="rating-number">{rating} out of 5</div>
            <div className="rating-label">Customer Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
