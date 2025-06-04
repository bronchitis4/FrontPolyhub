import './teacher-list-item.css'
import star from '../../../assets/images/star.png'
import { useState } from 'react'
import ReviewsList from '../../layout/reviews-list/reviews-list';

const TeacherListItem = ({id, fullName, imgUrl, bio, institute, email, avarageRating}) => {
    const [showReviews, setShowReviews] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem('User'));
    
    const rating = [];    
    for(let i = 0; i < avarageRating; i++) {
        rating.push(<img key={i} src={star} alt="star" />)
    }

    return (
        <div className="teacher-list-item-wrapper">
            <div className="teacher-list-item-content">
                <h1>{fullName}</h1>
                <div className="teacher-list-item-description">
                    <img className='teacher-avatar' src={imgUrl} alt={fullName}/>
                    <div className="teacher-list-item-info">
                        <p><b>Пошта:</b><br/> {email}</p>
                        <p><b>Інститут:</b><br/> {institute}</p>
                        <p><b>БІО:</b><br/>{bio}</p>
                    </div>
                </div>
            </div>
            <div className='teacher-list-item-active-block'>
                <div className='teacher-list-item-active-rating'> 
                    {rating}                       
                    <span>{avarageRating}/5</span>
                </div>
                <div className='teacher-list-item-active-review'>
                    <button onClick={() => setShowReviews(true)}>Відгуки</button>
                </div>
            </div>

            {showReviews && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={() => setShowReviews(false)}>×</button>
                        <ReviewsList 
                            teacher_id={id} 
                            current_user_id={currentUser?.user_id}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TeacherListItem;