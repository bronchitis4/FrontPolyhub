import { useEffect, useState } from 'react';
import '../assets/styles/mainPage.css';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthBlockInfo from '../components/ui/auth-block-info/auth-block-info';

const MainPage = ({left, center, rigth}) => {
    const { role } = useContext(AuthContext);
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    if(!role) {
        return <AuthBlockInfo/>;
    }

    return(
        <div className="main-page">
            {!isLandingPage && <div className='left-container'>{left}</div>}
            <div className={`center-container ${isLandingPage ? 'full-width' : ''}`}>{center}</div>
            <div className='right-container'>{rigth}</div>
        </div>
    )
}

export default MainPage;