import { fetchWithAuth } from './authFetch'; 

class ProfileService {
    apiUrl = 'https://polyhub-server.onrender.com';

    getProfileById = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/profile/${id}`);
            return await response.json();
        } catch (error) {
            return error;
        }
    }
}

export default ProfileService;
