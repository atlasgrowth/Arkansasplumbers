import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainContent from './components/MainContent';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ContextProvider, Context } from './components/Context/Context';
import './styles/App.css';

function AppContent() {
  const { business, loading } = useContext(Context);
  const location = useLocation();

  useEffect(() => {
    // 1) Remove the hash from the URL if present
    if (location.hash) {
      // This erases the hash without reloading the page
      window.history.replaceState(
        '',
        document.title,
        location.pathname + location.search
      );
    }
    // 2) Always scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="app">
      <Header business={business} loading={loading} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/residential" element={<ResidentialPage />} />
        <Route path="/commercial" element={<CommercialPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

export default App;