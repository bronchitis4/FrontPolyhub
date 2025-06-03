import './verify-form.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const VerifyForm = () => {

    const location = useLocation();
    const { email } = location.state || {};

    const [verificationClientCode, setCode] = useState();
    const [error, setError] = useState(null);
    const {login} = useContext(AuthContext);

    const navigate = useNavigate();
    const handleVer = async (e) => {
        e.preventDefault();
        setError(null);
        const data = {
            email,
            verificationClientCode
        }
        console.log(JSON.stringify(data));
        
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
            }else{
                console.log("Верифікація пройшла гуд: " + responseData);
                console.log("accessToken: " + responseData.accessToken);
                console.log("refreshToken: " + responseData.refreshToken);
                console.log("Token: " + responseData.accessToken);

                // localStorage.setItem('accessToken', responseData.accessToken); 
                // localStorage.setItem('refreshToken', responseData.refreshToken); 

                console.log(responseData.data);
                localStorage.setItem('User', JSON.stringify(responseData.data));
                const user = JSON.parse(localStorage.getItem('User'));
                
                localStorage.setItem("accessToken", user.accessToken);
                login(responseData.data.role);
                navigate('/posts');
            }

        }catch (error) {
            console.error('Error:', error);
            setError('Error: ' + error.error);
        }
    }

    return(
        <form className="verify-form" onSubmit={handleVer}>
            <h1>Верифікація</h1>
            <label htmlFor="email">Електронна пошта</label>
            <input name="email" type="email" value={email}  placeholder="Пошта" readOnly/>
            
            <label htmlFor="code">Код верифікації</label>
            <input name="code" value={verificationClientCode} onChange={(e) => setCode(e.target.value)}  type="text" placeholder="Код верифікації"/>
            
            <button type="submit">Верифікувати</button>
            <p>{error}</p>
        </form>
    )

}

export default VerifyForm;