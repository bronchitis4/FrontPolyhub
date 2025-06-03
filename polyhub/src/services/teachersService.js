import { fetchWithAuth } from './authFetch';

class TeacherService {
    apiUrl = 'https://polyhub-server.onrender.com';

    createTeacher = async (data) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/teachers/`, {
                method: 'POST',
                body: data //formdata
            });
            const responseData = await response.json();
            console.log(responseData);
            
            return responseData;
        } catch (error) {
            return error;
        }
    }

    getAllTeachers = async (limit = 10, offset = 0, institute_id = 2) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/teachers?limit=${limit}&offset=${offset}&institute_id=${institute_id}`);
            const data = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            return error;
        }
    }

    searhTeachersByFullName = async (full_name) => {
        try {
            const response = await fetchWithAuth(`${this.apiUrl}/teachers/search?full_name=${full_name}`);
            const data = await response.json();
            console.log(data);
           
            return data;
        } catch (error) {
            return error;
        }
    }
}

export default TeacherService;
