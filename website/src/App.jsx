import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './styles/App.css';

function App() {
  // Get the URL parameter (e.g., ?site_id=1stcallplumbing)
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId) {
      setLoading(false);
      return;
    }
    // Use a relative path so the file is fetched from the public folder:
    fetch(`data/processed/businesses/${siteId}.json`)
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
  }, [siteId]);

  return (
    <div className="app">
      <Header business={business} loading={loading} />
      <Hero business={business} loading={loading} />
    </div>
  );
}

export default App;

