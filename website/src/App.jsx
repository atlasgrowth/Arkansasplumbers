import Context from './components/Context/Context';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About'; // Added About import
import './styles/App.css';
import Services from './components/Services/Services';
import Reviews from './components/Reviews/Reviews';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';


function App() {
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!siteId) {
      setLoading(false);
      return;
    }
    // Fetch JSON data directly from GitHub using the raw content URL.
    // Adjust the branch if necessary.
    fetch(`https://raw.githubusercontent.com/greekfreek23/Arkansasplumbers/main/data/processed/businesses/${siteId}.json`)
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
      <About business={business} loading={loading} />
      <Services business={business} loading={loading} />
      <Reviews business={business} loading={loading} />
      <Contact business={business} loading={loading} />
      <Footer business={business} loading={loading} />
    </div>
  );
}


export default App;