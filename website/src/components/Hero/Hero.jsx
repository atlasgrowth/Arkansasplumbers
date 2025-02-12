import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useBusiness from '../../utils/useBusiness';
import './Hero.css';

const Hero = () => {
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('site_id');

    const { business, loading, error } = useBusiness(businessId);

    if (!businessId) return <div className="hero-error">Please provide a site_id parameter</div>;
    if (loading) return <div className="hero-loading">Loading...</div>;
    if (error) return <div className="hero-error">{error}</div>;

    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">{business?.basic_info?.name}</h1>
                <p className="hero-phone">{business?.basic_info?.phone}</p>
                <div className="hero-rating">
                    <span>Rating: {business?.basic_info?.rating || 'N/A'}</span>
                    <span>Reviews: {business?.review_trends?.total_reviews || '0'}</span>
                </div>
            </div>
        </div>
    );
};

export default Hero;