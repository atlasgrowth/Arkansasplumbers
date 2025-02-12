// src/components/Services/Services.jsx

import React, { useEffect } from 'react';
import './Services.css';

const Services = ({ business, loading }) => {
  // Fallback placeholders if business data is missing:
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const phoneNumber = business?.basic_info?.phone || "";
  const callHref = phoneNumber
    ? `tel:${phoneNumber.replace(/[^0-9]/g, '')}`
    : "#";

  useEffect(() => {
    const image = new Image();
    image.src = 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';

    const boxes = document.querySelectorAll('.service-box');
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerInstance.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    boxes.forEach((box) => observer.observe(box));

    return () => {
      boxes.forEach((box) => observer.unobserve(box));
    };
  }, []);

  return (
    <section className="services-section" id="services">
      {/* Dark overlay to ensure text is legible on the background */}
      <div className="services-overlay"></div>

      <h2 className="service-heading">
        Expert Solutions by <span data-business-name>{businessName}</span>
      </h2>

      <div className="services-grid">
        {/* 24/7 Emergency Service */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h3 className="service-title">24/7 Emergency Service</h3>
          <p className="service-description">
            Immediate response to all plumbing emergencies. Available day or night.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>

        {/* Residential Plumbing */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-home"></i>
          </div>
          <h3 className="service-title">Residential Plumbing</h3>
          <p className="service-description">
            Complete home plumbing solutions from repairs to remodels.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>

        {/* Drain Cleaning */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-shower"></i>
          </div>
          <h3 className="service-title">Drain Cleaning</h3>
          <p className="service-description">
            Professional drain cleaning and maintenance. Keep drains flowing smoothly.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>

        {/* Water Heater Services */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-fire"></i>
          </div>
          <h3 className="service-title">Water Heater Services</h3>
          <p className="service-description">
            Installation, repair, and maintenance of all water heater types.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>

        {/* Repairs & Installation */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-wrench"></i>
          </div>
          <h3 className="service-title">Repairs & Installation</h3>
          <p className="service-description">
            Quality-guaranteed repairs and new installations by licensed professionals.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>

        {/* Leak Detection */}
        <div className="service-box">
          <div className="icon-container">
            <i className="fas fa-tint"></i>
          </div>
          <h3 className="service-title">Leak Detection</h3>
          <p className="service-description">
            Advanced technology to locate and repair hidden leaks quickly.
          </p>
          <a href={callHref} className="call-btn">
            <i className="fas fa-phone"></i> Call Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;