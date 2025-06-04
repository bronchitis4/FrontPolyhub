import './review-form.css'
import ReviewService from '../../../services/reviewService'
import { useState } from 'react';

const ReviewForm = ({review_id, teacher_id, user_id, onAddReview, parent_id}) => {
    const reviewService = new ReviewService();
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reviewData = {
                teacher_id,
                review_id,
                user_id,
                content
            };
            if (parent_id) reviewData.parent_id = parent_id;
            const response = await reviewService.createReview(reviewData);
            if (response && response.data) {
                onAddReview(response.data);
            } else if (response) {
                onAddReview(response);
            }
            setContent("");
        } catch(error) {
            return error;
        }
    }
    
    return(
        <div className="review-form-wrapper">
            <form onSubmit={handleSubmit}>
                <textarea 
                    className='review-content-input' 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Напишіть ваш відгук..."
                />
                <button type="submit">Додати відгук</button>
            </form>
        </div>
    );
}

export default ReviewForm; 