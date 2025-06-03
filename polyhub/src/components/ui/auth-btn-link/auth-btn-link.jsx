import { NavLink } from "react-router-dom"
import './auth-btn-link.css'

const AuthBtnLink = () => {
    return (
        <NavLink to="/register" className="auth-btn-link">
            Авторизуватися
        </NavLink>
    )
}

export default AuthBtnLink;