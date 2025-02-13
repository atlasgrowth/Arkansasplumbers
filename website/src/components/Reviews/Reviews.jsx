import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = ({ business, loading }) => {
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = business?.five_star_reviews || [];
  const reviewsLink = business?.basic_info?.reviews_link || '';

  useEffect(() => {
    if (!reviews.length) return;
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
          <div className="review-card" key={currentReview}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">{reviews[currentReview].text}</p>
            <div className="review-author">- {reviews[currentReview].reviewer_name}</div>
            <div className="review-date">
              {new Date(reviews[currentReview].date).toLocaleDateString()}
            </div>
          </div>
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
        {reviewsLink && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href={reviewsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="review-button"
            >
              Read Our Reviews
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
