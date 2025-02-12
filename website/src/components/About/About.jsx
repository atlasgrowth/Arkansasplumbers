import React from 'react';
import './About.css';

const About = ({ business, loading }) => {
  if (loading) return <div className="about-loading">Loading...</div>;

  const { name = "", phone = "" } = business?.basic_info || {};

  return (
    <section className="about-v1" id="about">
      <div className="about-container">
        <h2 className="about-title">Trusted Plumbing Experts</h2>
        <div className="about-content">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&q=80" alt="Professional Plumber" />
          </div>
          <div className="about-text">
            <p>With over 20 years of experience, {name || 'we'} have been providing top-notch plumbing services to our community. Our team of certified professionals is dedicated to solving your plumbing problems with precision and care.</p>
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Projects Done</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
            <a href={`tel:${phone?.replace(/[^0-9]/g, '')}`} className="contact-button">
              <i className="fas fa-phone"></i> Contact Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;