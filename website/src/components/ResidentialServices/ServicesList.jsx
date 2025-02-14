
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
      description: 'Complete bathroom solutions including toilet repairs, shower installations, and pipe maintenance.'
    },
    {
      icon: 'fa-sink',
      title: 'Kitchen Plumbing',
      description: 'Expert kitchen plumbing services from sink repairs to garbage disposal installation.'
    },
    {
      icon: 'fa-tint',
      title: 'Leak Detection',
      description: 'State-of-the-art leak detection and repair services to protect your home.'
    },
    {
      icon: 'fa-temperature-hot',
      title: 'Water Heaters',
      description: 'Installation, repair, and maintenance of all types of water heaters.'
    }
  ];

  return (
    <section className="residential-services">
      <h2 className="section-title">Our Professional Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <i className={`fas ${service.icon}`}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="cta-button">
                <i className="fas fa-phone"></i>
                Call Now
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;
