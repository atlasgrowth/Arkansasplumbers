
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import About from './About/About';
import Services from './Services/Services';
import Reviews from './Reviews/Reviews';
import Footer from './Footer/Footer';

function MainContent() {
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!siteId) {
        setLoading(false);
        return;
      }

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
    <div className="app">
      <Header business={business} loading={loading} />
      <Hero business={business} loading={loading} />
      <About business={business} loading={loading} />
      <Services business={business} loading={loading} />
      <Reviews business={business} loading={loading} />
      <Footer business={business} loading={loading} />
    </div>
  );
}

export default MainContent;
