import { use } from "react";

const apiUrl = 'https://polyhub-server.onrender.com';

export async function refreshToken() {
    const user = JSON.parse(localStorage.getItem('User'));
    const user_id = user.user_id;
    try {
        const response = await fetch(`${apiUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user_id}),
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) throw new Error('Не вдалося оновити токен');
        localStorage.setItem('User', JSON.stringify({...user, accessToken: data.data.accessToken}));
        return data.data.accessToken;
    } catch (error) {
        console.error('Помилка оновлення токена:', error);
        throw error;
    }
}


export async function fetchWithAuth(url, options = {}, retry = true) {
    const user = localStorage.getItem('User');
    const token = await JSON.parse(user).accessToken;

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
    };

    try {
        const response = await fetch(url, { ...options, headers });
// || response.status === 403
        if (response.status === 401 && retry || response.status === 403 && retry) {
            const newToken = await refreshToken();
            return fetchWithAuth(url, { ...options, headers: { ...options.headers, 'Authorization': `Bearer ${newToken}` } }, false);
        }

        return response;
    } catch (error) {
        throw error;
    }
}
