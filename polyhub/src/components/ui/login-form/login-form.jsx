import { useState, useContext } from "react";
import './login-form.css';
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authService";
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';

const LoginForm = () => {
    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const authService = new AuthService();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        setSubmit(true);
        e.preventDefault();
        setError(null);
    
        const data = {
            email,
            password
        };
    
        try {
            const response = await authService.login(data);
          
            if (response.statusCode === 200) {
                localStorage.setItem('User', JSON.stringify(response.data));
                login(response.data.role); // Update auth context
                navigate('/'); // Перенаправляємо на головну сторінку
            } else {
                setError(response.message);
                setSubmit(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error: ' + error.message);
            setSubmit(false);
        }
    };

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Вхід</h1>
           
            <label htmlFor="email">
                <FiMail className="input-icon" /> Електронна пошта
            </label>
            <div className="input-wrapper">
                <input 
                    name="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Введіть вашу пошту"
                    required
                />
            </div>
            
            <label htmlFor="password">
                <FiLock className="input-icon" /> Пароль
            </label>
            <div className="input-wrapper">
                <input 
                    name="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Введіть ваш пароль"
                    required
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" disabled={submit}>
                <FiLogIn className="button-icon" />
                {submit ? 'Вхід...' : 'Увійти'}
            </button>
            
            <Link to="/register">Немає акаунту? Зареєструватися</Link>
        </form>
    );
}

export default LoginForm;