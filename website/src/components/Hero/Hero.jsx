import React from 'react';
import { useSearchParams } from 'react-router-dom';
import useBusiness from '../../utils/useBusiness';
import './Hero.css';

const Hero = () => {
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('site_id');
    
    const { business, loading } = useBusiness(businessId);

    return (
        <div className="hero">
            <header className="hero-header">
                <h1>{loading ? "Loading..." : business?.basic_info?.name}</h1>
                <p className="phone">{loading ? "" : business?.basic_info?.phone}</p>
            </header>
            <section className="hero-about">
                <h2>About</h2>
                <p>{loading ? "Loading about..." : business?.basic_info?.about}</p>
            </section>
        </div>
    );
};

export default Hero;