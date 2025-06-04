import './verify-form.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";
import { AuthContext } from '../../../context/AuthContext';
import { FiMail, FiKey, FiCheck } from 'react-icons/fi';

const VerifyForm = () => {
    const location = useLocation();
    const { email } = location.state || {};

    const [verificationClientCode, setCode] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleVer = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        const data = {
            email,
            verificationClientCode
        }
        
        try {
            const response = await fetch('https://polyhub-server.onrender.com/auth/ver', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();

            if (responseData.statusCode === 400) {
                setError(responseData.error);
                setIsSubmitting(false);
            } else {
                localStorage.setItem('User', JSON.stringify(responseData.data));
                const user = JSON.parse(localStorage.getItem('User'));
                
                localStorage.setItem("accessToken", user.accessToken);
                login(responseData.data.role);
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error: ' + error.error);
            setIsSubmitting(false);
        }
    }

    return(
        <form className="verify-form" onSubmit={handleVer}>
            <h1>Верифікація</h1>
            
            <label htmlFor="email">
                <FiMail className="input-icon" /> Електронна пошта
            </label>
            <div className="input-wrapper">
                <input 
                    name="email" 
                    type="email" 
                    value={email} 
                    placeholder="Ваша пошта" 
                    readOnly
                />
            </div>
            
            <label htmlFor="code">
                <FiKey className="input-icon" /> Код верифікації
            </label>
            <div className="input-wrapper">
                <input 
                    name="code" 
                    value={verificationClientCode} 
                    onChange={(e) => setCode(e.target.value)} 
                    type="text" 
                    placeholder="Введіть код верифікації"
                    required
                />
            </div>

            {error && <p className="error-message">{error}</p>}
            
            <button type="submit" disabled={isSubmitting}>
                <FiCheck className="button-icon" />
                {isSubmitting ? 'Верифікація...' : 'Верифікувати'}
            </button>
        </form>
    )
}

export default VerifyForm;