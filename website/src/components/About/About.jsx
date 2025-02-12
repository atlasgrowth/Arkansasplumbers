import React from 'react';
import './About.css';

const About = ({ business, loading }) => {
  if (loading) return <div className="about-loading">Loading...</div>;

  const {
    name = "",
    phone = "",
    city = "",
    state = "",
    working_hours = {},
  } = business?.basic_info || {};

  // Parse working hours
  let workingHoursText = "Available when you need us";
  if (typeof working_hours === 'object' && Object.keys(working_hours).length > 0) {
    const isAlways = Object.values(working_hours).every(hours => hours === "Open 24 hours");
    workingHoursText = isAlways ? "Open 24/7" : "Contact us for current hours";
  }

  const plumberImage = "https://images.unsplash.com/photo-1608283833336-5fb6f919e5ea?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="about-parallax" id="about">
      <div className="parallax-bg">
        <img src={plumberImage} alt="Plumber" className="about-image" />
      </div>
      <div className="about-content-wrapper">
        <div className="about-header">
          <h2 className="glow-text">Excellence in <span className="highlight">Plumbing</span></h2>
          <p className="subheadline"><strong>Your Trusted Partner in</strong> Professional Plumbing Solutions</p>
        </div>

        <div className="about-main-content">
          <div className="company-intro">
            <p className="intro-text">
              <span className="company-name">{name}</span> is your premier plumbing service provider
              {city && state ? ` in ${city}, ${state}` : ''}.
              With a commitment to excellence and customer satisfaction, we deliver
              top-tier plumbing solutions for both residential and commercial needs.
              {workingHoursText === "Open 24/7" && " We're proud to offer round-the-clock service to meet your emergency needs."}
            </p>
          </div>

          <div className="about-cta">
            <a href="#services" className="cta-button primary">
              <i className="fas fa-wrench"></i> Our Services
            </a>
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="cta-button secondary">
                <i className="fas fa-phone"></i> Call Now
              </a>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;