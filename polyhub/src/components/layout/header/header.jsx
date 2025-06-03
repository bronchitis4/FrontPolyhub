import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useLocation } from "react-router-dom";
import LogoutBtn from "../../ui/logout-btn/logout-btn";
import './header.css'

const Header = ({search}) => {
    const location = useLocation();
    return(
        <header>
            <nav className='navbar'>
                <span className="logo">POLYHUB</span>
                {location.pathname  === "/posts" || location.pathname  === "/teachers" ? search : null}
                <div className="log-in">
{location.pathname  !== "/register" && location.pathname  !== "/login" && <LogoutBtn/>}                </div>
            </nav>
        </header>
    )
}

export default Header;