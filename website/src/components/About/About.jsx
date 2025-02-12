
import React from 'react';
import './About.css';
import plumberImage from '../../assets/plumber-stock.jpg';

const About = ({ business, loading }) => {
  if (loading) return <div className="about-loading">Loading...</div>;

  const {
    name = "",
    phone = "",
    city = "",
    state = "",
    working_hours = {},
  } = business?.basic_info || {};

  // Create location text
  const locationText = city && state ? `${city}, ${state}` : "your local area";

  // Parse working hours
  let workingHoursText = "Available when you need us";
  if (typeof working_hours === 'object' && Object.keys(working_hours).length > 0) {
    const isAlways = Object.values(working_hours).every(hours => hours === "Open 24 hours");
    workingHoursText = isAlways ? "Open 24/7" : "Contact us for current hours";
  }

  return (
    <section className="about" id="about">
      <div className="about-content">
        <div className="about-text">
          <span className="about-label">About Us</span>
          <h2 className="about-title">
            Professional Plumbing Services in <span className="highlight">{locationText}</span>
          </h2>
          
          <p className="about-description">
            At {name}, we pride ourselves on delivering exceptional plumbing services with 
            professionalism and reliability. Our team of experienced plumbers is dedicated 
            to solving your plumbing needs efficiently and effectively.
          </p>

          <div className="about-features">
            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="feature-text">
                <h3>Availability</h3>
                <p>{workingHoursText}</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="feature-text">
                <h3>Licensed & Insured</h3>
                <p>Your peace of mind is our priority</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="feature-text">
                <h3>Quick Response</h3>
                <p>Contact us anytime</p>
                <a href={`tel:${phone}`} className="phone-button">
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-image">
          <img src={plumberImage} alt="Professional Plumber" />
        </div>
      </div>
    </section>
  );
};

export default About;
