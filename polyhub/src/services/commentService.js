import { fetchWithAuth } from './authFetch';

class CommentService {
    apiUrl = 'https://polyhub-server.onrender.com';

    createComment = async (data) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/comments/`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const responseData = await response.json();
            console.log(responseData);
            
            return responseData;
        } catch (error) {
            return error;
        }
    }

    getCommentsByPostID = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/comments/post/${id}`);
            const data = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            return error;
        }
    }

    getRepliesByCommentId = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/comments/${id}/replies`);
            const data = await response.json();
            console.log(data);
           
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default CommentService;
