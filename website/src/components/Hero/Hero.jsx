import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Hero = () => {
  const [searchParams] = useSearchParams();
  const businessId = searchParams.get('site_id');

  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    fetch(`/Arkansasplumbers/data/processed/businesses/${businessId}.json`)
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
        console.error('Error fetching business:', err);
        setLoading(false);
      });
  }, [businessId]);

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (!business) {
    return <div style={styles.container}>No business data found</div>;
  }

  const basic = business.basic_info || {};
  const name = basic.name || "Your Local Plumber";
  const phone = basic.phone || "N/A";
  // Use city if available; otherwise, default to "your area"
  const city = (basic.city && basic.city.trim()) || "your area";
  
  const aboutText = `Serving ${city} with top-notch plumbing services. Contact ${name} at ${phone} for fast, reliable service.`;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>{name}</h1>
      <p style={styles.phone}>{phone}</p>
      <h2 style={styles.subHeader}>About Us</h2>
      <p style={styles.about}>{aboutText}</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 100%)',
    color: 'white',
    textAlign: 'center',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  phone: {
    fontSize: '1.5rem',
    color: '#63b3ed',
    marginBottom: '2rem',
  },
  subHeader: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  about: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

export default Hero;
