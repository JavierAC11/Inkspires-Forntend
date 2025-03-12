import axios from 'axios';

/**
 * Funcion que obtiene los posts de un usuario
 * @param {number} userId
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<object>}
 */

export const getMyPosts = async (userId, page = 1, perPage = 10) => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    try {
        const response = await axios.get(`${apiUrl}/users/${userId}/posts?page=${page}&per_page=${perPage}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
