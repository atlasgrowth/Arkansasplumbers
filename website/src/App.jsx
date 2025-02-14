
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainContent from './components/MainContent';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ContextProvider } from './components/Context/Context';
import './styles/App.css';

function App() {
  const location = useLocation();
  const showMainHeader = location.pathname === '/';
  
  return (
    <ContextProvider>
      <div className="app">
        {!showMainHeader && <Header />}
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/residential" element={<ResidentialPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
        </Routes>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
