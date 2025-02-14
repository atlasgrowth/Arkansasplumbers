import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../components/Context/Context';
import ResidentialHeader from '../components/ResidentialServices/ResidentialHeader';
import ServicesList from '../components/ResidentialServices/ServicesList';
import EmergencySection from '../components/ResidentialServices/EmergencySection';
import './Pages.css';

const ResidentialPage = () => {
  const { business } = useContext(Context);

  return (
    <div className="residential-page">
      <ResidentialHeader business={business} />
      <ServicesList />
      <EmergencySection business={business} />
      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
};

export default ResidentialPage;