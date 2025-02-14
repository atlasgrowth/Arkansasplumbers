
import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import './ResidentialServices.css';

const ServicesList = () => {
  const { business } = useContext(Context);
  const phone = business?.basic_info?.phone || '';
  
  const services = [
    {
      icon: 'fa-shower',
      title: 'Bathroom Plumbing',
      description: 'Expert bathroom solutions including toilet repairs, shower installations, and pipe maintenance.'
    },
    {
      icon: 'fa-sink',
      title: 'Kitchen Plumbing',
      description: 'Professional kitchen plumbing from sink repairs to garbage disposal installation.'
    },
    {
      icon: 'fa-tint',
      title: 'Leak Detection',
      description: 'Advanced leak detection and repair services to protect your property.'
    },
    {
      icon: 'fa-temperature-hot',
      title: 'Water Heaters',
      description: 'Installation and repair of traditional and tankless water heaters.'
    },
    {
      icon: 'fa-wrench',
      title: 'Pipe Repair',
      description: 'Expert pipe repair and replacement services for all types of plumbing systems.'
    },
    {
      icon: 'fa-pump-soap',
      title: 'Drain Cleaning',
      description: 'Professional drain cleaning and maintenance to prevent clogs and backups.'
    }
  ];

  return (
    <section className="residential-services">
      <h2 className="section-title">Our Professional Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">
              <i className={`fas ${service.icon}`}></i>
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="cta-button">
                <i className="fas fa-phone"></i>
                Schedule Service
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
