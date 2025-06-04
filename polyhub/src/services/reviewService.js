import { fetchWithAuth } from './authFetch';

class ReviewService {
    apiUrl = 'https://polyhub-server.onrender.com';

    createReview = async (data) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/reviews/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json();
            console.log(responseData);
            
            return responseData;
        } catch (error) {
            return error;
        }
    }

    getReviewsByTeacherId = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/reviews/teacher/${id}`);
            const data = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            return error;
        }
    }

    getRepliesByReviewId = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/reviews/${id}/replies`);
            const data = await response.json();
            console.log(data);
           
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default ReviewService; 