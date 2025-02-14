
import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const ResidentialPage = () => {
  return (
    <div className="service-page">
      <h1>Residential Plumbing Services</h1>
      
      <div className="service-content">
        <section className="regular-services">
          <h2>Our Residential Services</h2>
          <div className="services-list">
            <div className="service-item">
              <i className="fas fa-shower"></i>
              <h3>Bathroom Plumbing</h3>
              <p>Complete bathroom plumbing services including repairs, installations, and renovations.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-sink"></i>
              <h3>Kitchen Plumbing</h3>
              <p>Kitchen sink repairs, garbage disposal installation, and water line services.</p>
            </div>
            <div className="service-item">
              <i className="fas fa-tint"></i>
              <h3>Leak Detection</h3>
              <p>Advanced leak detection and repair services for your home.</p>
            </div>
          </div>
        </section>

        <section id="emergency" className="emergency-services">
          <h2>24/7 Emergency Services</h2>
          <p>We're available around the clock for any plumbing emergencies:</p>
          <ul>
            <li>Burst pipes</li>
            <li>Severe leaks</li>
            <li>Sewage backups</li>
            <li>Water heater failures</li>
          </ul>
        </section>
      </div>

      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default ResidentialPage;
