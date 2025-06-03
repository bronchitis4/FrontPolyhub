import './comment-form.css'
import CommentService from '../../../services/commentService'
import { useState } from 'react';

const CommentForm = ({comment_id, post_id, user_id, onAddComment, parent_id}) => {
    const commentService = new CommentService();
    const [content, setContent] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const commentData = {
                post_id,
                comment_id,
                user_id,
                content
            };
            if (parent_id) commentData.parent_id = parent_id;
            const response = await commentService.createComment(commentData);
            if (response && response.data) {
                onAddComment(response.data);
            } else if (response) {
                onAddComment(response);
            }
            setContent("");
        } catch(error) {
            return error;
        }
    }
    
    return(
        <div className="comment-form-wrapper">
            <form onSubmit={handleSubmit}>
                <textarea className='comment-content-input' value={content} onChange={(e) => setContent(e.target.value)}/>
                <button type="submit">Прокоментувати</button>
            </form>
        </div>
    )
}

export default CommentForm;