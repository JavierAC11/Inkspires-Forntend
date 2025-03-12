import axios from 'axios';


/**
 * Funcion que obtiene los posts
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<object>}
 */
export async function getPosts(page = 1, perPage = 8) {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  console.log(apiUrl);

  try {
    const response = await axios.get(`${apiUrl}/posts?page=${page}&per_page=${perPage}`);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    return { data: [], links: { next: null } };
  }
}
