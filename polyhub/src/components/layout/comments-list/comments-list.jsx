import { useEffect, useState } from "react";
import CommentBlock from "../../ui/comment-block/comment-block";
import CommentService from "../../../services/commentService";
import './comments-list.css'
const CommentsList = ({comments}) => {
    return (
        <div className="comments-list">
            <h3>Коментарі</h3>
            {comments.length === 0 ? (
                <p>Коментарів ще немає.</p>
            ) : (
                comments.map(comment => (
                    <CommentBlock 
                        key={comment.id}
                        user_id={comment.user_id}
                        content={comment.content}
                        date={comment.created_at}
                        comment_id={comment.id}
                        post_id={comment.post_id}
                        current_user_id={comment.current_user_id}
                    />
                ))
            )}
        </div>
    );
}

export default CommentsList;