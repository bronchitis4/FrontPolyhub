import './review-form.css'
import ReviewService from '../../../services/reviewService'
import { useState } from 'react';

const ReviewForm = ({review_id, teacher_id, user_id, onAddReview, parent_id}) => {
    const reviewService = new ReviewService();
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                teacher_id,
                review_id,
                user_id,
                content,
                rating: parent_id ? undefined : rating // Only include rating for new reviews, not replies
            };
            if (parent_id) reviewData.parent_id = parent_id;
            const response = await reviewService.createReview(reviewData);
            if (response && response.data) {
                onAddReview(response.data);
            } else if (response) {
                onAddReview(response);
            }
            setContent("");
            setRating(5);
        } catch(error) {
            return error;
        }
    }

    const renderStars = () => {
        return Array(5).fill(0).map((_, index) => (
            <span 
                key={index} 
                className={`star ${index < rating ? 'filled' : ''}`}
                onClick={() => !parent_id && setRating(index + 1)}
                style={{ cursor: parent_id ? 'default' : 'pointer' }}
            >
                ★
            </span>
        ));
    };
    
    return(
        <div className="comment-form-wrapper">
            <form onSubmit={handleSubmit}>
                {!parent_id && (
                    <div className="rating-input">
                        {renderStars()}
                        <span className="rating-number">{rating}/5</span>
                    </div>
                )}
                <textarea 
                    className='comment-content-input' 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={parent_id ? "Напишіть вашу відповідь..." : "Напишіть ваш відгук..."}
                />
                <button type="submit">{parent_id ? "Відповісти" : "Додати відгук"}</button>
            </form>
        </div>
    );
}

export default ReviewForm; 