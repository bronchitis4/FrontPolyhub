import UserInfoBlock from "../user-info-block/user-info-block"
import ActionPostBlock from "../action-post-block/action-post-block"
import './comment-block.css'
import { useState, useEffect } from 'react';
import CommentForm from '../comment-form/comment-form.jsx';
import CommentService from '../../../services/commentService';
import { FiMessageSquare, FiCornerDownRight } from 'react-icons/fi';

const CommentBlock = ({user_id, content, date, comment_id, post_id, current_user_id}) => {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replies, setReplies] = useState([]);
    const [showReplies, setShowReplies] = useState(false);
    const [hasReplies, setHasReplies] = useState(false);
    const commentService = new CommentService();

    // Load initial reply count
    useEffect(() => {
        const checkReplies = async () => {
            try {
                const response = await commentService.getRepliesByCommentId(comment_id);
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
    }, [comment_id]);

    const handleShowReplies = async () => {
        if (!showReplies) {
            const response = await commentService.getRepliesByCommentId(comment_id);
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

    return(
        <div>
            <div className="comment-block-wrapper">
                <UserInfoBlock id={user_id} postCreateDate={date}/>
                <div className="comment-block-content">
                    {content}
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
                    <CommentForm 
                        comment_id={comment_id} 
                        user_id={current_user_id} 
                        onAddComment={handleAddReply} 
                        parent_id={comment_id}
                    />
                )}
            </div>
            {showReplies && replies.length > 0 && (
                <div className="replies-list">
                    {replies.map(reply => (
                        <CommentBlock
                            key={reply.id}
                            user_id={reply.user_id}
                            content={reply.content}
                            date={reply.created_at}
                            comment_id={reply.id}
                            post_id={post_id}
                            current_user_id={current_user_id}
                        />
                    ))}
                </div>
            )}
            {/*<ActionPostBlock post_id={null} comment_id={comment_id} className="action-post-block"/> */}
        </div>
    )
}

export default CommentBlock;