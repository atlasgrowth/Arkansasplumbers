
import React from 'react';
import './ResidentialServices.css';

const ServicesList = () => {
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
    },
    {
      icon: 'fa-house-flood-water',
      title: 'Sewer Services',
      description: 'Complete sewer line repair, replacement, and maintenance services.'
    },
    {
      icon: 'fa-faucet',
      title: 'Fixture Installation',
      description: 'Professional installation of all types of plumbing fixtures and accessories.'
    }
  ];

  return (
    <section className="services-grid">
      {services.map((service, index) => (
        <div key={index} className="service-card">
          <i className={`fas ${service.icon}`}></i>
          <h3>{service.title}</h3>
          <p>{service.description}</p>
        </div>
      ))}
    </section>
  );
};

export default ServicesList;
