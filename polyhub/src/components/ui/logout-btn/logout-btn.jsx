import AuthService from '../../../services/authService'
import { useNavigate } from 'react-router-dom';
import './logout-btn.css'

const LogoutBtn = () => {
    const authService = new AuthService();
    const navigate = useNavigate();

    const handleExit = async () => {
        try {
            const response = await authService.logout();
            navigate('/login')
            console.log("Вийшов");
        }catch(error) {
            console.log(error)
        }
    }
    return (
        <button className="logout-btn" onClick={handleExit}>
            Вийти
        </button>
    )
}

export default LogoutBtn;