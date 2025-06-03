import { useState } from "react";
import './login-form.css';
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../../../services/authService";

const LoginForm = () => {
    const [submit, setSubmit] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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
          
            console.log(response);
            if (response.statusCode === 200) {
                console.log(response.data);
                localStorage.setItem('User', JSON.stringify(response.data));
                navigate('/teachers');
            } else {
                console.log(response.error);
                setError(response.message);
                setSubmit(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error: ' + error.message);
        }
    };

    return(
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Вхід</h1>
           
            <label htmlFor="email">Електронна пошта</label>
            <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Пошта"/>
            
            <label htmlFor="password">Пароль</label>
            <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль"/>
            <p>{error}</p>
            <button type="submit" disabled={submit} style={submit ? {background: 'gray'} : {} }>Увійти</button>
            <Link to="/register">Зареєструватися</Link>

        </form>
    );
}

export default LoginForm;