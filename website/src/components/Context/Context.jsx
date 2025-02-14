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
          // Create session ID if not exists
          if (!window.sessionId) {
            window.sessionId = Math.random().toString(36).substring(2, 8);
            window.sessionStart = new Date().toISOString();
            window.pageViews = [];
            window.startTime = Date.now();
          }
          
          // Add current page to pageViews
          window.pageViews.push(window.location.pathname || '/');
          
          const analyticsData = {
            sessionStart: window.sessionStart,
            businessName: correctedSiteId,
            sessionId: window.sessionId,
            pageViews: window.pageViews,
            timeOnSite: Math.round((Date.now() - window.startTime) / 1000),
            pageCount: window.pageViews.length
          };

          fetch('https://script.google.com/macros/s/AKfycbzl7BE82-9JiYSC18DZwL6VXPkScZCA_aGEMW5lZWBTR947Ez0Kg_madw0b4QIcrre2/exec', {
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