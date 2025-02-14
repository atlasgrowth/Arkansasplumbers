
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import About from './About/About';
import Services from './Services/Services';
import Reviews from './Reviews/Reviews';

function MainContent() {
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!siteId) {
        setLoading(false);
        return;
      }

      const timestamp = new Date().getTime();
      const correctedSiteId = siteId === '1callplumbing' ? '1stcallplumbing' : siteId;
      const url = `https://raw.githubusercontent.com/greekfreek23/Arkansasplumbers/main/data/processed/businesses/${correctedSiteId}.json?t=${timestamp}`;

      fetch(url)
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
    </div>
  );
}

export default MainContent;
