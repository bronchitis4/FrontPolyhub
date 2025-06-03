import { useState } from "react";
import './register-form.css';
import { Link, useNavigate } from "react-router-dom";
import AuthService from '../../../services/authService.js'

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
        }
    };

    return(
        <form className="register-form" onSubmit={handleSubmit}>
            <h1>Реєстрація</h1>
            <label htmlFor="firstName">Ім'я</label>
            <input name="firstName" type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder="Ім'я"/>
            
            <label htmlFor="surname">Прізвище</label>
            <input name="surname" type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Прізвище"/>
            
            <label htmlFor="email">Електронна пошта</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Пошта"/>
            
            <label htmlFor="password">Пароль</label>
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
            <p>{error}</p>
            <button type="submit" disabled={submit} style={submit ? {background: 'gray'} : {} }>Зареєструватися</button>
            <Link to="/login">Увійти</Link>
        </form>
    );
}

export default RegisterForm;