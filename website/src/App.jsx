
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/residential" element={<ResidentialPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
