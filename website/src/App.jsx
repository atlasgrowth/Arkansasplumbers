import React, { useEffect, useContext } from 'react';
import { Routes, Route, useLocation, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  // Preserve site_id when navigating
  useEffect(() => {
    const siteId = searchParams.get('site_id');
    if (!location.search && siteId) {
      window.history.replaceState({}, '', `${location.pathname}?site_id=${siteId}`);
    }
    
    // Only scroll to top if pathname changes (actual route change)
    if (location.hash === '') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

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