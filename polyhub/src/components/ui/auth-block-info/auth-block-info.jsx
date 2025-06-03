import './auth-block-info.css'
import AuthBtnLink from '../auth-btn-link/auth-btn-link';
const AuthBlockInfo = () => {
    return(
        <div className="auth-block-info-wrapper">
            <p>Ви не авторизовані!</p>
            <AuthBtnLink/>
        </div>
    )
}

export default AuthBlockInfo;