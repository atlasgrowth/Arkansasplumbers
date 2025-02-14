
import React, { useContext } from 'react';
import { Context } from '../Context/Context';
import './ResidentialServices.css';

const ResidentialHeader = () => {
  const { business } = useContext(Context);
  const phone = business?.basic_info?.phone || '';
  const name = business?.basic_info?.name || 'Your Trusted Plumber';
  
  return (
    <header className="residential-header">
      <div className="header-content">
        <h1>{name}</h1>
        <p className="res-subtitle">Expert Residential Plumbing Solutions</p>
        {phone && (
          <a href={`tel:${phone}`} className="res-cta-button">
            <i className="fas fa-phone"></i> Call Now: {phone}
          </a>
        )}
      </div>
    </header>
  );
};

export default ResidentialHeader;
