
import React from 'react';
import ResidentialHeader from '../components/ResidentialServices/ResidentialHeader';
import ServicesList from '../components/ResidentialServices/ServicesList';
import EmergencySection from '../components/ResidentialServices/EmergencySection';
import './Pages.css';

const ResidentialPage = () => {
  return (
    <div className="residential-page">
      <ResidentialHeader />
      <ServicesList />
      <EmergencySection />
    </div>
  );
};

export default ResidentialPage;
