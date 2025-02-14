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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <section id="hero">
        <Hero business={business} loading={loading} />
      </section>

      <section id="about">
        <About business={business} loading={loading} />
      </section>

      <Services business={business} loading={loading} />

      <section id="reviews">
        <Reviews business={business} loading={loading} />
      </section>
    </div>
  );
}

export default MainContent;