import { fetchWithAuth } from './authFetch';

class PostService {
    apiUrl = 'https://polyhub-server.onrender.com';
    createPost = async (data) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/posts/`, {
                method: 'POST',
                body: data,
            });
            const responseData = await response.json();
            console.log(responseData);
            return responseData;
        } catch (error) {
            throw error;
        }
    }

    getAllPosts = async (limit, offset, category_id = 1) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/posts?category_id=${category_id}&limit=${limit}&offset=${offset}`);
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            return error;
        }
    }

    getPostById = async (id) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/posts/${id}`);
            return await response.json();
        } catch (error) {
            return error;
        }
    }

    getPostByCategory = async (category_id, limit, offset) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/posts/category?category_id=${category_id}&limit=${limit}&offset=${offset}`);
            return await response.json();
        } catch (error) {
            return error;
        }
    }

    deletePostById = async (post_id) => {
         try {
            const response = await fetchWithAuth(`${this.apiUrl}/posts/${post_id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            console.log(data);

            return data;
        } catch (error) {
            return error;
        }
    }
}

export default PostService;
