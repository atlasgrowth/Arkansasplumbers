import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/residential" element={<ResidentialPage />} />
      <Route path="/commercial" element={<CommercialPage />} />
    </Routes>
  );
}

export default App;
