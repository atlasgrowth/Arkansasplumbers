import { useState, useEffect } from 'react';

const useBusiness = (businessId) => {
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBusiness = async () => {
            if (!businessId) {
                setError('No business ID provided');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/data/processed/businesses/${businessId}.json`);
                if (!response.ok) throw new Error('Business not found');
                const data = await response.json();
                setBusiness(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBusiness();
    }, [businessId]);

    return { business, loading, error };
};

export default useBusiness;