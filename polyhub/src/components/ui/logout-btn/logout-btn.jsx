import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from 'react-icons/fi';

const LogoutBtn = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('User');
        localStorage.removeItem('accessToken');
        logout();
        navigate('/');
    }

    return (
        <button onClick={handleLogout}>
            <FiLogOut /> Вийти
        </button>
    );
}

export default LogoutBtn;