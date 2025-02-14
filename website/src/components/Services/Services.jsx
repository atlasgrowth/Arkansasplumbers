import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = ({ business }) => {
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const phoneNumber = business?.basic_info?.phone || "";
  const callHref = phoneNumber ? `tel:${phoneNumber.replace(/[^0-9]/g, '')}` : "#";

  return (
    <section className="services-section" id="services">
      <div className="services-overlay"></div>
      <h2 className="service-heading">Our Professional Services</h2>

      <div className="services-grid">
        {/* Residential Plumbing */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-home"></i>
          </div>
          <h3>Residential Plumbing</h3>
          <p>Complete home plumbing solutions for your family's comfort and safety.</p>
          <Link to="/residential" className="read-more-btn">Read More</Link>
        </div>

        {/* Commercial Plumbing */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-building"></i>
          </div>
          <h3>Commercial Plumbing</h3>
          <p>Professional plumbing services for businesses and commercial properties.</p>
          <Link to="/commercial" className="read-more-btn">Read More</Link>
        </div>

        {/* Emergency Services */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>Emergency Services</h3>
          <p>24/7 emergency plumbing response when you need it most.</p>
          <Link to="/residential#emergency" className="read-more-btn">Learn More</Link>
          <a href={callHref} className="emergency-btn">
            <i className="fas fa-phone"></i> Emergency Call
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;