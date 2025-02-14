
import React from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = ({ business }) => {
  const businessName = business?.basic_info?.name || "Your Trusted Plumber";
  const phoneNumber = business?.basic_info?.phone || "";
  const callHref = phoneNumber ? `tel:${phoneNumber.replace(/[^0-9]/g, '')}` : "#";

  return (
    <section className="services-section" id="services">
      <h2 className="service-heading">Our Professional Services</h2>

      <div className="services-grid">
        <div className="service-box" style={{
          backgroundImage: `url('https://st2.depositphotos.com/1006441/9452/i/380/depositphotos_94520022-stock-photo-plumber-on-the-kitchen.jpg')`
        }}>
          <h3>Residential Plumbing</h3>
          <p>Expert home plumbing solutions for your family's comfort and safety. From repairs to installations, we've got you covered.</p>
          <Link to="/residential" className="read-more-btn">Read More</Link>
        </div>

        <div className="service-box" style={{
          backgroundImage: `url('https://griswoldplumbingct.com/wp-content/uploads/2018/04/5-tips-on-hiring-the-right-plumber.jpeg')`
        }}>
          <h3>Commercial Plumbing</h3>
          <p>Comprehensive plumbing solutions for businesses of all sizes. Minimize downtime with our professional services.</p>
          <Link to="/commercial" className="read-more-btn">Read More</Link>
        </div>

        <div className="service-box" style={{
          backgroundImage: `url('https://www.benjaminfranklinplumbing.com/images/blog/24-7-Emergency-Plumbing-Services.jpg')`
        }}>
          <h3>Emergency Services</h3>
          <p>24/7 emergency plumbing response when you need it most. Fast, reliable service for urgent plumbing issues.</p>
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
