import { useState } from "react";
import './register-form.css';
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../../../services/authService.js'
import { FiUser, FiUsers, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

const RegisterForm = () => {
    const [submit, setSubmit] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const authService = new AuthService()
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        setSubmit(true);
        e.preventDefault();
        setError(null);
    
        const data = {
            first_name,
            surname,
            email,
            password
        };
    
        try {
            const response = await authService.register(data);
            console.log("Response from registration:", response);
            if (response.statusCode === 200) {
                console.log("Реєстрація пройшла успішно: " + response);
                navigate('/verification', { state: { email } });
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
        <form className="register-form" onSubmit={handleSubmit}>
            <h1>Реєстрація</h1>
            
            <label htmlFor="firstName">
                <FiUser className="input-icon" /> Ім'я
            </label>
            <div className="input-wrapper">
                <input 
                    name="firstName" 
                    type="text" 
                    value={first_name} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="Введіть ваше ім'я"
                    required
                />
            </div>
            
            <label htmlFor="surname">
                <FiUsers className="input-icon" /> Прізвище
            </label>
            <div className="input-wrapper">
                <input 
                    name="surname" 
                    type="text" 
                    value={surname} 
                    onChange={(e) => setSurname(e.target.value)} 
                    placeholder="Введіть ваше прізвище"
                    required
                />
            </div>
            
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
                <FiUserPlus className="button-icon" />
                {submit ? 'Реєстрація...' : 'Зареєструватися'}
            </button>
            
            <Link to="/login">Вже маєте акаунт? Увійти</Link>
        </form>
    );
}

export default RegisterForm;