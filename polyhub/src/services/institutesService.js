import { fetchWithAuth } from './authFetch';

class InstitutesService {
    apiUrl = 'https://polyhub-server.onrender.com';

    getAllInstitutes = async () => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/institutes`);
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            throw error;
        }
    }
}

export default InstitutesService;
