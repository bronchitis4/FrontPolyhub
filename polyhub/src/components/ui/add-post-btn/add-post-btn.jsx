import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../../styles/buttons.css';

const AddPostBtn = () => {
    const location = useLocation();
    const isPostsPage = location.pathname === '/posts';
    const isTeachersPage = location.pathname === '/teachers';

    if (!isPostsPage && !isTeachersPage) return null;

    const buttonProps = isPostsPage 
        ? {
            to: '/posts/add',
            className: 'btn btn-create-post',
            text: 'Створити пост'
        }
        : {
            to: '/teachers/add',
            className: 'btn btn-add-teacher',
            text: 'Додати викладача'
        };

    return (
        <Link to={buttonProps.to} className={buttonProps.className}>
            <i className="fas fa-plus-circle"></i>
            {buttonProps.text}
        </Link>
    );
}

export default AddPostBtn;