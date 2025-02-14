import React, { useContext, useState, useEffect } from 'react';
import { Context } from './Context/Context';
import { useSearchParams } from 'react-router-dom';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import About from './About/About';
import Services from './Services/Services';
import Reviews from './Reviews/Reviews';

function MainContent() {
  const { business, loading } = useContext(Context);
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');

  useEffect(() => {
    // Always scroll to top on first mount
    window.scrollTo(0, 0);
  }, []);

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!siteId) {
      // No site ID? Just stop loading
      setLoading(false);
      return;
    }

    // Adjust for your site ID logic
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
  }, [siteId]);

  return (
    <div className="app">
      {/* Hero section */}
      <section id="hero">
        <Hero business={business} loading={loading} />
      </section>

      {/* About section */}
      <section id="about">
        <About business={business} loading={loading} />
      </section>

      {/* Services section */}
      <Services business={business} loading={loading} />

      {/* Reviews section */}
      <section id="reviews">
        <Reviews business={business} loading={loading} />
      </section>


    </div>
  );
}

export default MainContent;