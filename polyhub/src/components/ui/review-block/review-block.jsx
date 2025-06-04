import React, { useState, useEffect } from 'react';
import UserInfoBlock from '../user-info-block/user-info-block';
import ActionPostBlock from '../action-post-block/action-post-block';
import './review-block.css';
import ReviewForm from '../review-form/review-form.jsx';
import ReviewService from '../../../services/reviewService';
import { FiMessageSquare, FiCornerDownRight } from 'react-icons/fi';

const ReviewBlock = ({ user_id, content, date, review_id, teacher_id, current_user_id, rating }) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [hasReplies, setHasReplies] = useState(false);
    const reviewService = new ReviewService();

    // Load initial reply count
    useEffect(() => {
        const checkReplies = async () => {
            try {
                const response = await reviewService.getRepliesByReviewId(review_id);
                const repliesData = response.data || [];
                setHasReplies(repliesData.length > 0);
                if (showReplies) {
                    setReplies(repliesData);
                }
            } catch (error) {
                console.error('Error checking replies:', error);
            }
        };
        
        checkReplies();
    }, [review_id]);

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
        setShowReplies(true);
        setHasReplies(true);
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
            <div className="comment-block-wrapper">
                <UserInfoBlock id={user_id} postCreateDate={date} />
                <div className="comment-block-content">
                    <div className="review-rating">
                        {renderStars(rating)}
                        <span className="rating-number">{rating}/5</span>
                    </div>
                    <div className="review-text">
                        {content}
                    </div>
                </div>
                <div className="comment-actions">
                    <button 
                        className="comment-btn"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                    >
                        <FiCornerDownRight />
                        Відповісти
                    </button>
                    {hasReplies && (
                        <button 
                            className="comment-btn"
                            onClick={handleShowReplies}
                        >
                            <FiMessageSquare />
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
                <ActionPostBlock comment_id={review_id} />
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
                            rating={reply.rating}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewBlock; 