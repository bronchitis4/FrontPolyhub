import { Link } from "react-router-dom"
import './auth-btn-link.css'

const AuthBtnLink = () => {
    return (
        <Link to="/login" className="auth-btn">
            Увійти в акаунт
        </Link>
    )
}

export default AuthBtnLink;