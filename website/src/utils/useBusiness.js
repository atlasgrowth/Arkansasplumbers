import { useState, useEffect } from 'react';

const useBusiness = (businessId) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!businessId) {
      setLoading(false);
      return;
    }

    fetch(`/Arkansasplumbers/data/processed/businesses/${businessId}.json`)
      .then(res => res.json())
      .then(data => {
        setBusiness(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching business:', err);
        setLoading(false);
      });
  }, [businessId]);

  return { business, loading };
};

export default useBusiness;
