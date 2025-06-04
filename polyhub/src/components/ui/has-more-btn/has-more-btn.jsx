import React from 'react';
import '../../../styles/buttons.css';

const HasMoreBtn = ({children, action}) => {
    return (
        <button className="btn btn-load-more" onClick={action}>
            <i className="fas fa-sync-alt"></i>
            {children}
        </button>
    );
}

export default HasMoreBtn;