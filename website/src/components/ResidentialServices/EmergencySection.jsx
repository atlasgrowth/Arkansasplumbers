
import React from 'react';
import './ResidentialServices.css';

const EmergencySection = ({ business }) => {
  const phone = business?.basic_info?.phone || '';
  
  return (
    <section id="emergency" className="emergency-section">
      <div className="emergency-content">
        <h2>24/7 Emergency Services</h2>
        <div className="emergency-grid">
          <div className="emergency-info">
            <h3>We're Here When You Need Us</h3>
            <ul>
              <li><i className="fas fa-check"></i> Burst Pipes</li>
              <li><i className="fas fa-check"></i> Severe Leaks</li>
              <li><i className="fas fa-check"></i> Sewage Backups</li>
              <li><i className="fas fa-check"></i> Water Heater Failures</li>
            </ul>
            {phone && (
              <a href={`tel:${phone}`} className="emergency-button">
                <i className="fas fa-phone"></i> Call Now
              </a>
            )}
          </div>
          <div className="emergency-image"></div>
        </div>
      </div>
    </section>
  );
};

export default EmergencySection;
