import { fetchWithAuth } from './authFetch'; // змінити шлях за потребою

class VoteService {
    apiUrl = 'https://polyhub-server.onrender.com';

    async createVote(data) {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/votes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error in createVote:', error);
            throw error;
        }
    }

    async getVotesCount(post_id, comment_id = null) {
        try {
            const url = comment_id 
                ? `${this.apiUrl}/votes/count?comment_id=${comment_id}`
                : `${this.apiUrl}/votes/count?post_id=${post_id}`;
                
            const response = await fetchWithAuth(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error in getVotesCount:', error);
            throw error;
        }
    }

    async getUserVote(user_id, post_id, comment_id = null) {
        try {
            const url = comment_id 
                ? `${this.apiUrl}/votes/user?user_id=${user_id}&comment_id=${comment_id}`
                : `${this.apiUrl}/votes/user?user_id=${user_id}&post_id=${post_id}`;
                
            const response = await fetchWithAuth(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Error in getUserVote:', error);
            throw error;
        }
    }

    getActivesDataById = async (id) => {
        
    }
}

export default VoteService;
