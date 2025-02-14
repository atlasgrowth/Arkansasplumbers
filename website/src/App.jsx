import Context from './components/Context/Context';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Updated import
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Reviews from './components/Reviews/Reviews';
import Footer from './components/Footer/Footer';
import './styles/App.css';

function App() {
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== 'undefined') {
      if (!siteId) {
        setLoading(false);
        return;
      }

      // Add cache-busting query parameter
      const timestamp = new Date().getTime();
      const url = `https://raw.githubusercontent.com/greekfreek23/Arkansasplumbers/main/data/processed/businesses/${siteId}.json?t=${timestamp}`;

      fetch(url, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setBusiness(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching business data:', err);
          setLoading(false);
        });
    }
  }, [siteId]);

  return (
    <BrowserRouter basename="/Arkansasplumbers"> {/* Updated BrowserRouter */}
      <div className="app">
        <Header business={business} loading={loading} />
        <Hero business={business} loading={loading} />
        <About business={business} loading={loading} />
        <Services business={business} loading={loading} />
        <Reviews business={business} loading={loading} />
        <Footer business={business} loading={loading} />
      </div>
    </BrowserRouter> {/* Updated closing tag */}
  );
}

export default App;