import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import LogoutBtn from "../../ui/logout-btn/logout-btn";
import './header.css'

const Header = ({search}) => {
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const showSearch = location.pathname === "/posts" || location.pathname === "/teachers";
    const showAuth = location.pathname !== "/register" && location.pathname !== "/login" && location.pathname !== "/verification";
    const isLandingPage = location.pathname === "/";

    const user = localStorage.getItem('User');
    const isAuthenticated = !!user;

    const handleProfileClick = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    // Закриваємо меню при кліку поза ним
    const handleClickOutside = (e) => {
        if (!e.target.closest('.user-profile')) {
            setShowProfileMenu(false);
        }
    };

    // Додаємо слухач кліків при монтуванні
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return(
        <header className={isLandingPage ? 'transparent' : ''}>
            <nav className='navbar'>
                <Link to="/" className="logo">POLYHUB</Link>
                {showSearch && search}
                {showAuth && (
                    <div className="auth-buttons">
                        {isAuthenticated ? (
                            <div className="user-profile">
                                <button className="profile-button" onClick={handleProfileClick}>
                                    Профіль
                                </button>
                                {showProfileMenu && (
                                    <div className="profile-menu">
                                        <LogoutBtn />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-login">Увійти</Link>
                                <Link to="/register" className="btn-signup">Зареєструватись</Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;