import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import './styles/App.css';

function App() {
  // Get the URL parameter (e.g., ?site_id=1stcallplumbing)
  const [searchParams] = useSearchParams();
  const siteId = searchParams.get('site_id');

  return (
    <div className="app">
      {/* You can pass the siteId to components if needed */}
      <Header />
      <Hero siteId={siteId} />
    </div>
  );
}

export default App;
