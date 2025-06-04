import { fetchWithAuth } from './authFetch';

class VoteService {
    apiUrl = 'https://polyhub-server.onrender.com';
    //apiUrl = 'http://localhost:3000'; L
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
                ? `${this.apiUrl}/votes/${comment_id}/commentVotes`
                : `${this.apiUrl}/votes/${post_id}/postVotes`;
                
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

    async getUserVote(user_id, post_id=null, comment_id = null) {
        try {
            const url = comment_id 
                ? `${this.apiUrl}/votes/user?user_id=${user_id}&comment_id=${comment_id}`
                : `${this.apiUrl}/votes/user?user_id=${user_id}&post_id=${post_id}`;
                
            console.log(post_id, comment_id, user_id);
            console.log(url);
            const response = await fetchWithAuth(url);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error in getUserVote:', error);
            throw error;
        }
    }

    getActivesDataById = async (id) => {
        
    }
}

export default VoteService;
