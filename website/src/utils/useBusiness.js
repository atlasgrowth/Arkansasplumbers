import { useState, useEffect } from 'react';

const useBusiness = (businessId) => {
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBusiness = async () => {
            if (!businessId) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/data/processed/businesses/${businessId}.json`);
                const data = await response.json();
                setBusiness(data);
            } catch (err) {
                console.error('Error fetching business:', err);
            }
            setLoading(false);
        };

        fetchBusiness();
    }, [businessId]);

    return { business, loading };
};

export default useBusiness;