import React, { createContext, useState, useEffect } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const siteId = urlParams.get('site_id') || '1callplumbing';
      const timestamp = new Date().getTime();
      const correctedSiteId = siteId === '1callplumbing' ? '1stcallplumbing' : siteId;

      try {
        const response = await fetch(`https://raw.githubusercontent.com/greekfreek23/Arkansasplumbers/main/data/processed/businesses/${correctedSiteId}.json?t=${timestamp}`);
        const data = await response.json();
        setBusiness(data);
        // Track analytics after fetch (regardless of success)
        try {
          // Initialize session data
          if (!window.sessionData) {
            window.sessionData = {
              id: Math.random().toString(36).substr(2, 9),
              start: new Date().toISOString(),
              pages: new Set(),
              startTime: Date.now(),
              lastActive: Date.now()
            };
          }
          
          // Update session data
          window.sessionData.pages.add(window.location.pathname);
          window.sessionData.lastActive = Date.now();
          
          const analyticsData = {
            name: correctedSiteId,
            page: Array.from(window.sessionData.pages).join(', '),
            time: Math.round((Date.now() - window.sessionData.startTime) / 1000),
            visits: 1
          };

          fetch('https://script.google.com/macros/s/AKfycbzpd2oOXeRmMWPafsgAND2wSUsKlFCPdGj_K7zin74n34Qt6oqQEN7RW2EY0VFiBleH/exec', {
            method: 'POST',
            body: JSON.stringify(analyticsData),
            headers: {
              'Content-Type': 'application/json'
            },
            mode: 'no-cors' // Add this to handle CORS issues
          }).catch(err => console.error('Analytics error:', err));
        } catch (err) {
          console.error('Analytics setup error:', err);
        }

      } catch (error) {
        console.error('Error fetching business data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  return (
    <Context.Provider value={{ business, loading }}>
      {children}
    </Context.Provider>
  );
};