import React, { useState } from 'react';
import UserInfoBlock from '../user-info-block/user-info-block';
import './review-block.css';
import ReviewForm from '../review-form/review-form';
import ReviewService from '../../../services/reviewService';

const ReviewBlock = ({ user_id, content, date, review_id, teacher_id, current_user_id }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const reviewService = new ReviewService();

    const handleShowReplies = async () => {
        if (!showReplies) {
            const response = await reviewService.getRepliesByReviewId(review_id);
            setReplies(response.data || []);
        }
        setShowReplies(!showReplies);
    };

    const handleAddReply = (newReply) => {
        setReplies(prev => [newReply, ...prev]);
        setShowReplyForm(false);
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
                ★
            </span>
        ));
    };

    return (
        <div>
            <div className="review-block-wrapper">
                <UserInfoBlock id={user_id} postCreateDate={date} />
                <div className="review-block-content">
                    <div className="review-rating">
                        {renderStars(rating)}
                        <span className="rating-number">{rating}/5</span>
                    </div>
                    <div className="review-text">
                        {content}
                    </div>
                </div>
                <div className="review-actions">
                    <button onClick={() => setShowReplyForm(!showReplyForm)}>
                        Відповісти
                    </button>
                    {replies.length > 0 && (
                        <button onClick={handleShowReplies}>
                            {showReplies ? 'Сховати відповіді' : 'Показати відповіді'}
                        </button>
                    )}
                </div>
                {showReplyForm && (
                    <ReviewForm
                        review_id={review_id}
                        user_id={current_user_id}
                        teacher_id={teacher_id}
                        onAddReview={handleAddReply}
                        parent_id={review_id}
                    />
                )}
            </div>
            {showReplies && replies.length > 0 && (
                <div className="replies-list">
                    {replies.map(reply => (
                        <ReviewBlock
                            key={reply.id}
                            user_id={reply.user_id}
                            content={reply.content}
                            date={reply.created_at}
                            review_id={reply.id}
                            teacher_id={teacher_id}
                            current_user_id={current_user_id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewBlock; 