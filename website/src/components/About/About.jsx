import React from 'react';
import './About.css';

const About = ({ business, loading }) => {
  if (loading) return <div className="about-loading">Loading...</div>;

  const {
    name = "",
    phone = "",
    city = "",
    state = "",
    working_hours = {},
    rating = 0,
  } = business?.basic_info || {};

  // Parse working hours
  let workingHoursText = "Available when you need us";
  if (typeof working_hours === 'object' && Object.keys(working_hours).length > 0) {
    const isAlways = Object.values(working_hours).every(hours => hours === "Open 24 hours");
    workingHoursText = isAlways ? "Open 24/7" : "Contact us for current hours";
  }

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-header">
          <h2>Why Choose {name || 'Us'}?</h2>
          <div className="about-header-line"></div>
          <p className="about-subtitle">Professional Plumbing Services You Can Trust</p>
        </div>

        <div className="about-features">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Licensed & Insured</h3>
            <p>Fully certified professionals you can trust with your home</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>24/7 Availability</h3>
            <p>{workingHoursText}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Top Rated Service</h3>
            <p>{rating} star rated service in {city || 'your area'}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Expert Solutions</h3>
            <p>Advanced equipment and proven techniques</p>
          </div>
        </div>

        <div className="about-cta">
          <div className="cta-content">
            <h3>Need Emergency Plumbing Service?</h3>
            <p>We're available 24/7 for urgent plumbing issues</p>
          </div>
          <a href={`tel:${phone?.replace(/[^0-9]/g, '')}`} className="cta-button">
            <i className="fas fa-phone"></i>
            <span>Call Now: {phone || 'Contact Us'}</span>
          </a>
        </div>

        <div className="about-benefits">
          <div className="benefit">
            <i className="fas fa-check-circle"></i>
            <span>Same Day Service</span>
          </div>
          <div className="benefit">
            <i className="fas fa-check-circle"></i>
            <span>Fair & Transparent Pricing</span>
          </div>
          <div className="benefit">
            <i className="fas fa-check-circle"></i>
            <span>Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;