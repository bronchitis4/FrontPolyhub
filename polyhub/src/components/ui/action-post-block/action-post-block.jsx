import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './action-post-block.css'
import VoteService from '../../../services/voteService'
import LikeSvg from '../../../assets/images/like.svg'
import DislikeSvg from  '../../../assets/images/dislike.svg'
import CommentSvg from '../../../assets/images/comment.svg'
import '../../../styles/buttons.css';

const ActionPostBlock = ({post_id, comment_id}) => {
    const voteService = new VoteService();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [userAction, setUserAction] = useState(null); // 'liked', 'disliked', or null
    const user = JSON.parse(localStorage.getItem('User'));
    const user_id = user ? user.user_id : null;

    // Завантаження початкових даних
    useEffect(() => {
        const fetchVotes = async () => {
            try {
                // Отримуємо кількість лайків/дизлайків
                const votesCount = await voteService.getVotesCount(post_id, comment_id);
                console.log('Initial votes count:', votesCount);
                if (votesCount.data) {
                    setLikes(votesCount.data.likes || 0);
                    setDislikes(votesCount.data.dislikes || 0);
                }

                // Отримуємо голос користувача якщо він авторизований
                if (user_id) {
                    const userVote = await voteService.getUserVote(user_id, post_id, comment_id);
                    console.log('Initial user vote:', userVote);
                    if (userVote.data) {
                        setUserAction(userVote.data.vote_type === 1 ? 'liked' : 'disliked');
                    }
                }
            } catch (error) {
                console.error('Error fetching votes:', error);
            }
        };
        
        fetchVotes();
    }, [post_id, comment_id, user_id]);

    const handleAction = async (vote_type) => {
        if (!user_id) {
            alert('Будь ласка, авторизуйтесь щоб голосувати');
            return;
        }

        try {
            // Оптимістичне оновлення UI
            const isLike = vote_type === 1;
            const currentAction = userAction;
            
            // Якщо користувач натискає ту саму кнопку - видаляємо голос
            if ((isLike && currentAction === 'liked') || (!isLike && currentAction === 'disliked')) {
                setUserAction(null);
                setLikes(prev => isLike ? prev - 1 : prev);
                setDislikes(prev => !isLike ? prev - 1 : prev);
            } 
            // Якщо користувач змінює свій голос
            else if (currentAction) {
                setUserAction(isLike ? 'liked' : 'disliked');
                if (isLike) {
                    setLikes(prev => prev + 1);
                    setDislikes(prev => prev - 1);
                } else {
                    setLikes(prev => prev - 1);
                    setDislikes(prev => prev + 1);
                }
            }
            // Якщо користувач голосує вперше
            else {
                setUserAction(isLike ? 'liked' : 'disliked');
                setLikes(prev => isLike ? prev + 1 : prev);
                setDislikes(prev => !isLike ? prev + 1 : prev);
            }

            const data = {
                vote_type,
                post_id,
                user_id,
                comment_id
            };

            console.log('Sending vote data:', data);
            const response = await voteService.createVote(data);
            console.log('Vote response:', response);
            
            // Оновлюємо дані з сервера для синхронізації
            const votesCount = await voteService.getVotesCount(post_id, comment_id);
            console.log('Updated votes count:', votesCount);
            if (votesCount.data) {
                setLikes(votesCount.data.likes || 0);
                setDislikes(votesCount.data.dislikes || 0);
            }

            const userVote = await voteService.getUserVote(user_id, post_id, comment_id);
            console.log('Updated user vote:', userVote);
            if (userVote.data) {
                setUserAction(userVote.data.vote_type === 1 ? 'liked' : 'disliked');
            } else {
                setUserAction(null);
            }
        } catch (error) {
            console.error('Error handling vote:', error);
            // Повертаємо попередній стан у випадку помилки
            const votesCount = await voteService.getVotesCount(post_id, comment_id);
            if (votesCount.data) {
                setLikes(votesCount.data.likes || 0);
                setDislikes(votesCount.data.dislikes || 0);
            }
        }
    };

    return (
        <div className="action-block">
            <div className="action-buttons">
                <button 
                    className={`action-btn ${userAction === 'liked' ? 'liked' : ''}`}
                    onClick={() => handleAction(1)}
                >
                    <i className="fas fa-thumbs-up"></i>
                    <span className="action-count">{likes}</span>
                </button>
                <button 
                    className={`action-btn ${userAction === 'disliked' ? 'disliked' : ''}`}
                    onClick={() => handleAction(-1)}
                >
                    <i className="fas fa-thumbs-down"></i>
                    <span className="action-count">{dislikes}</span>
                </button>
                {post_id && (
                    <Link to={`/post/${post_id}`} className="btn btn-primary">
                        <i className="fas fa-comment"></i>
                        Коментарі
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ActionPostBlock;