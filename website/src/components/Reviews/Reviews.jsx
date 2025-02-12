
import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = ({ business, loading }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = business?.five_star_reviews || [];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  if (loading || !reviews.length) return null;

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-overlay"></div>
      <div className="reviews-container">
        <h2 className="reviews-title">What Our Customers Say</h2>
        <div className="reviews-slider">
          <button 
            className="review-nav prev" 
            onClick={() => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
            aria-label="Previous review"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="review-card" key={currentReview}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">{reviews[currentReview].text}</p>
            <div className="review-author">- {reviews[currentReview].reviewer_name}</div>
            <div className="review-date">
              {new Date(reviews[currentReview].date).toLocaleDateString()}
            </div>
          </div>
          <button 
            className="review-nav next" 
            onClick={() => setCurrentReview((prev) => (prev + 1) % reviews.length)}
            aria-label="Next review"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
        <div className="review-dots">
          {reviews.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentReview ? 'active' : ''}`}
              onClick={() => setCurrentReview(index)}
              aria-label={`Review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
