import { useState } from 'react';
import { Link } from 'react-router-dom';
import './action-post-block.css'
import VoteService from '../../../services/voteService'
import LikeSvg from '../../../assets/images/like.svg'
import DislikeSvg from  '../../../assets/images/dislike.svg'
import CommentSvg from '../../../assets/images/comment.svg'


const ActionPostBlock = ({post_id, comment_id}) => {
    
    const voteService = new VoteService();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleAction = (vote_type) => {
        const fetchPosts = async () => {
            const data = {                
                vote_type, 
                post_id, 
                user_id: 78, 
                comment_id
            }
            console.log(data);
            try {
                const response = (await voteService.createVote(data));
                console.log(response);
            } catch (error) {
                console.error('Error fetching posts:', error.message);
            }
        };
        fetchPosts();     };

    return (
        <div className="post-list-item-actions"> 
            <div className="post-list-item-action-like-dislike">
                <div className="post-list-item-action-like" onClick={(e)=> handleAction('upvote')}>
                    <img src={LikeSvg} width="20px"/><span></span>
                </div>
                <div className="post-list-item-action-dislike" onClick={(e)=> handleAction('downvote')}>
                    <img src={DislikeSvg} width="20px"/><span></span>
                </div>
            </div>
            <div className='post-list-item-comment'><Link to={`/post/${post_id}`}><img src={CommentSvg} width="20px"/></Link></div>
        </div>
    );
};

export default ActionPostBlock;