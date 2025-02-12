import React from 'react';
import './Services.css';

const Services = ({ business, loading }) => {
  // Pull dynamic business info if available; fallback otherwise.
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const phoneNumber = business?.basic_info?.phone || "";
  const callHref = phoneNumber ? `tel:${phoneNumber.replace(/[^0-9]/g, '')}` : "#";

  return (
    <section className="services-section" id="services">
      <h2 className="service-heading">
        Expert Solutions by <span data-business-name>{businessName}</span>
      </h2>
      <div className="services-grid">
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3>24/7 Emergency Service</h3>
          <p>Immediate response to all plumbing emergencies. Available day or night.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-home"></i>
          </div>
          <h3>Residential Plumbing</h3>
          <p>Complete home plumbing solutions from repairs to remodels.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-shower"></i>
          </div>
          <h3>Drain Cleaning</h3>
          <p>Professional drain cleaning and maintenance. Keep drains flowing smoothly.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-fire"></i>
          </div>
          <h3>Water Heater Services</h3>
          <p>Installation, repair, and maintenance of all water heater types.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-wrench"></i>
          </div>
          <h3>Repairs & Installation</h3>
          <p>Quality-guaranteed repairs and new installations by licensed professionals.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-tint"></i>
          </div>
          <h3>Leak Detection</h3>
          <p>Advanced technology to locate and repair hidden leaks quickly.</p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
