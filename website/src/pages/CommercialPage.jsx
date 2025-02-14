
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const CommercialPage = () => {
  return (
    <div className="service-page">
      <h1>Commercial Plumbing Services</h1>
      
      <div className="service-content">
        <section className="commercial-services">
          <h2>Commercial Solutions</h2>
          <div className="services-list">
            <div className="service-item">
              <i className="fas fa-industry"></i>
              <h3>Industrial Plumbing</h3>
              <p>Comprehensive plumbing solutions for industrial facilities and manufacturing plants.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-store"></i>
              <h3>Retail Plumbing</h3>
              <p>Specialized plumbing services for retail locations and shopping centers.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-building"></i>
              <h3>Office Buildings</h3>
              <p>Complete plumbing maintenance and repair for office complexes.</p>
            </div>
          </div>
        </section>
      </div>

      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default CommercialPage;
