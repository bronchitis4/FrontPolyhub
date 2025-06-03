import { fetchWithAuth } from './authFetch.js';

class AuthService {
    apiUrl = 'https://polyhub-server.onrender.com';

    register = async (data) => {
        try {
            const response = await fetch(`${this.apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    checkAuth = async () => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/auth/check-auth`)
            const responseData = response.json();
            console.log(responseData);
            return responseData;
            
        }catch(error) {
            console.log(error);
            return error;
        }
    }

    verify = async (data) => {
        // const data = {
        //     email,
        //     verificationClientCode
        // }; 
        try {
            const response = await fetch(`${this.apiUrl}/auth/ver`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            
            });
            
            const responseData = await response.json();

            return responseData;
        } catch (error) {
            console.log(error);
        }
    }

    login = async (data) => {
        // const data = {
        //     email,
        //     password
        // };

        try {
            const response = await fetch(`${this.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }

            return responseData;        
        } catch (error) {
            return error;
        }
    }

    logout = async () => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/auth/logout`, {
                method: 'DELETE',
            });
            const responseData = await response.json();
            localStorage.setItem('User', null);

            console.log(responseData);
            return responseData;
        } catch(error) {
            return error;
        }
    }

}

export default AuthService;