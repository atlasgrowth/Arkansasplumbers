// Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = ({ business }) => {
  const phoneNumber = business?.basic_info?.phone || "";
  const callHref = phoneNumber ? `tel:${phoneNumber.replace(/[^0-9]/g, '')}` : "#";

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2 className="services-title">Our Professional Services</h2>
        <div className="services-underline"></div>

        <div className="services-grid">
          {/* Residential Plumbing Card */}
          <div className="service-card">
            <div 
              className="service-image"
              style={{
                backgroundImage: `url('https://st2.depositphotos.com/1006441/9452/i/380/depositphotos_94520022-stock-photo-plumber-on-the-kitchen.jpg')`
              }}
            />
            <div className="service-content">
              <h3>Residential Plumbing</h3>
              <p>Expert home plumbing solutions for your family's comfort and safety. From repairs to installations, we've got you covered.</p>
              <div className="service-buttons">
                <Link to="/residential" className="primary-button">Read More</Link>
              </div>
            </div>
          </div>

          {/* Commercial Plumbing Card */}
          <div className="service-card">
            <div 
              className="service-image"
              style={{
                backgroundImage: `url('https://griswoldplumbingct.com/wp-content/uploads/2018/04/5-tips-on-hiring-the-right-plumber.jpeg')`
              }}
            />
            <div className="service-content">
              <h3>Commercial Plumbing</h3>
              <p>Comprehensive plumbing solutions for businesses of all sizes. Minimize downtime with our professional services.</p>
              <div className="service-buttons">
                <Link to="/commercial" className="primary-button">Read More</Link>
              </div>
            </div>
          </div>

          {/* Emergency Services Card */}
          <div className="service-card">
            <div 
              className="service-image"
              style={{
                backgroundImage: `url('https://www.benjaminfranklinplumbing.com/images/blog/24-7-Emergency-Plumbing-Services.jpg')`
              }}
            />
            <div className="service-content">
              <h3>Emergency Services</h3>
              <p>24/7 emergency plumbing response when you need it most. Fast, reliable service for urgent plumbing issues.</p>
              <div className="service-buttons">
                <Link to="/residential#emergency" className="primary-button">Learn More</Link>
                <a href={callHref} className="emergency-button">
                  <svg 
                    className="phone-icon" 
                    viewBox="0 0 24 24"
                    fill="none" 
                    stroke="currentColor" 
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                    />
                  </svg>
                  Emergency Call
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;