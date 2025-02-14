
import React from 'react';
import './ResidentialServices.css';

const EmergencySection = ({ business }) => {
  const phone = business?.basic_info?.phone || '';
  
  return (
    <section className="emergency-services-section">
      <div className="emergency-content">
        <div className="emergency-header">
          <h2 className="glow-text">24/7 Emergency Services</h2>
          <p className="emergency-subtitle">Fast Response When You Need It Most</p>
        </div>

        <div className="emergency-grid">
          <div className="emergency-card">
            <div className="emergency-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Burst Pipes</h3>
            <p>Immediate response to minimize water damage</p>
          </div>

          <div className="emergency-card">
            <div className="emergency-icon">
              <i className="fas fa-tint"></i>
            </div>
            <h3>Major Leaks</h3>
            <p>Swift repair for any type of leak</p>
          </div>

          <div className="emergency-card">
            <div className="emergency-icon">
              <i className="fas fa-toilet"></i>
            </div>
            <h3>Sewage Backup</h3>
            <p>Expert handling of hazardous situations</p>
          </div>
        </div>

        {phone && (
          <div className="emergency-cta">
            <div className="emergency-badge">
              <i className="fas fa-clock"></i>
              <span>Available 24/7</span>
            </div>
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="emergency-button">
              <i className="fas fa-phone"></i>
              Emergency Service Now
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergencySection;
