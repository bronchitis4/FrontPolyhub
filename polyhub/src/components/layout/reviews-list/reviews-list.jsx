import React, { useState, useEffect } from 'react';
import ReviewService from '../../../services/reviewService';
import ReviewBlock from '../../ui/review-block/review-block';
import ReviewForm from '../../ui/review-form/review-form';
import './reviews-list.css';

const ReviewsList = ({ reviews }) => {
    return (
        <div className="reviews-list">
            <h3>Відгуки</h3>
            {reviews.length === 0 ? (
                <p>Відгуків ще немає.</p>
            ) : (
                reviews.map(review => (
                    <ReviewBlock 
                        key={review.id}
                        user_id={review.user_id}
                        content={review.content}
                        date={review.created_at}
                        review_id={review.id}
                        teacher_id={review.teacher_id}
                        current_user_id={review.current_user_id}
                    />
                ))
            )}
        </div>
    );
}

export default ReviewsList; 