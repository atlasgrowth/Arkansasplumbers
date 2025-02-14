
import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import './ResidentialServices.css';

const ServicesList = () => {
  const { business } = useContext(Context);
  const phone = business?.basic_info?.phone || '';
  
  const installations = [
    {
      icon: 'fa-shower',
      title: 'Bathroom Installation',
      description: 'Complete bathroom installations including fixtures, toilets, and showers.'
    },
    {
      icon: 'fa-sink',
      title: 'Kitchen Installation',
      description: 'Full kitchen plumbing installations from sinks to dishwashers.'
    },
    {
      icon: 'fa-temperature-hot',
      title: 'Water Heater Installation',
      description: 'Expert installation of traditional and tankless water heaters.'
    }
  ];

  const repairs = [
    {
      icon: 'fa-wrench',
      title: 'Pipe Repair',
      description: 'Professional repair services for all types of pipe systems.'
    },
    {
      icon: 'fa-tint',
      title: 'Leak Repair',
      description: 'Fast and reliable leak detection and repair services.'
    },
    {
      icon: 'fa-pump-soap',
      title: 'Drain Repair',
      description: 'Expert drain repair and cleaning services.'
    }
  ];

  return (
    <section className="residential-services">
      <div className="services-category">
        <h2 className="category-title">Professional Installations</h2>
        <div className="services-grid">
          {installations.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {phone && (
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="cta-button">
                  <i className="fas fa-phone"></i>
                  Schedule Installation
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="services-category">
        <h2 className="category-title">Expert Repairs</h2>
        <div className="services-grid">
          {repairs.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              {phone && (
                <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="cta-button">
                  <i className="fas fa-phone"></i>
                  Request Service
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
