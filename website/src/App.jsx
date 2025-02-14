
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './components/MainContent';
import ResidentialPage from './pages/ResidentialPage';
import CommercialPage from './pages/CommercialPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ContextProvider } from './components/Context/Context';
import './styles/App.css';

function App() {
  return (
    <ContextProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <main className="main-content">
                <MainContent />
              </main>
              <Footer />
            </>
          } />
          <Route path="/residential" element={<ResidentialPage />} />
          <Route path="/commercial" element={<CommercialPage />} />
        </Routes>
      </div>
    </ContextProvider>
  );
}

export default App;
