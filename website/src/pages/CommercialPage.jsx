
import React from 'react';
import { useContext } from 'react';
import { Context } from '../components/Context/Context';
import './Pages.css';

const CommercialPage = () => {
  const { business } = useContext(Context);
  const phone = business?.basic_info?.phone || '';

  return (
    <div className="commercial-page">
      {/* Hero Section */}
      <section className="commercial-hero">
        <div className="hero-content">
          <h1>Commercial Plumbing Solutions</h1>
          <p className="hero-subtitle">Expert Services for Businesses of All Sizes</p>
          {phone && (
            <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="hero-cta">
              Contact Us Now
            </a>
          )}
        </div>
      </section>

      {/* Core Services Section */}
      <section className="commercial-core-services">
        <h2>Comprehensive Commercial Solutions</h2>
        <div className="services-grid">
          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-building"></i>
            </div>
            <h3>Commercial Installation</h3>
            <p>Complete plumbing system installation for new construction and renovations, including water lines, drainage systems, and fixtures.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Preventive Maintenance</h3>
            <p>Regular inspections and maintenance programs to prevent costly breakdowns and extend system longevity.</p>
          </div>
          <div className="service-item">
            <div className="service-icon">
              <i className="fas fa-wrench"></i>
            </div>
            <h3>Emergency Repairs</h3>
            <p>24/7 emergency response for urgent plumbing issues to minimize business disruption and water damage.</p>
          </div>
        </div>
      </section>

      {/* Industries Served Section */}
      <section className="industries-served">
        <h2>Industries We Serve</h2>
        <div className="industries-grid">
          <div className="industry-card">
            <i className="fas fa-hotel"></i>
            <h3>Hotels & Hospitality</h3>
            <p>Specialized solutions for guest comfort and satisfaction</p>
          </div>
          <div className="industry-card">
            <i className="fas fa-utensils"></i>
            <h3>Restaurants</h3>
            <p>Kitchen and dining area plumbing expertise</p>
          </div>
          <div className="industry-card">
            <i className="fas fa-shopping-cart"></i>
            <h3>Retail Centers</h3>
            <p>Reliable systems for shopping centers and stores</p>
          </div>
          <div className="industry-card">
            <i className="fas fa-industry"></i>
            <h3>Industrial Facilities</h3>
            <p>Heavy-duty solutions for manufacturing plants</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommercialPage;
