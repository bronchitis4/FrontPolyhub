import './post-info.css'
import PostListItem from '../../ui/post-list-item/post-list-item.jsx'
import PostService from '../../../services/postService.js'
import CommentForm from '../../ui/comment-form/comment-form.jsx'
import CommentsList from '../comments-list/comments-list.jsx'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentService from '../../../services/commentService.js'

const PostInfo = () => {
    const postService = new PostService();
    const {id} = useParams();
    const [postData, setPostData] = useState({});
    const [comments, setComments] = useState([]);
    const commentService = new CommentService();

    
    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const response = await postService.getPostById(id)
                setPostData(response.data);
            }catch(error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        fetchPosts(); 
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try{
                const response = await commentService.getCommentsByPostID(id);
                setComments(response.data);
            }catch(error){
                console.error('Error fetching comments:', error);
            }
        }
        fetchComments();
    }, [id]);

    const handleAddComment = (newComment) => {
        setComments(prev => [newComment, ...prev]);
    }
    
    const user = JSON.parse(localStorage.getItem('User'));
    const current_user_id = user ? user.user_id : null;
    return(
        <div className="post-wrapper">
            <div className="post-info">
                <PostListItem key={postData.id} id={postData.id} header={postData.title} urlImage={postData.imageurl} content={postData.content} date={postData.created_at} user_id={postData.user_id} />
                <CommentForm user_id={current_user_id} post_id={id} onAddComment={handleAddComment}/>
                <CommentsList comments={comments.map(c => ({...c, post_id: id, current_user_id}))}/>
            </div>
        </div>
    )

}

export default PostInfo;