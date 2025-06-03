import './teacher-list-item.css'
import star from '../../../assets/images/star.png'
import { useState } from 'react'

const TeacherListItem = ({fullName, imgUrl,  bio, institute, email, avarageRating}) => {
    
    const rating = [];    
    for(let i = 0; i < avarageRating; i++) {
        rating.push(<img src={star} alt="star" />)
    }
    return (
        <div className="teacher-list-item-wrapper">
            <div className="teacher-list-item-content">
                <h1>{fullName}</h1>
                <div className="teacher-list-item-description">
                    <img className='teacher-avatar' src={imgUrl}/>
                    <div className="teacher-list-item-info">
                        <p><b>Пошта:</b><br/> {email}</p>
                        <p><b>Інститут:</b><br/> {institute}</p>
                        <p><b>БІО:</b><br/>{bio}</p>
                    </div>
                </div>
                <div className='teacher-list-item-active-block'>
                    <div className='teacher-list-item-active-rating'> 
                        {rating}                       
                        <span>{avarageRating}/5</span>
                    </div>
                    <div className='teacher-list-item-active-review'>
                        <button>Відгуки</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherListItem;