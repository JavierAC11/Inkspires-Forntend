import axios from 'axios';

export async function getPosts(page = 1, perPage = 8) {
  try {
    const response = await axios.get(`http://localhost/api/posts?page=${page}&per_page=${perPage}`);
    console.log(response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    return { data: [], links: { next: null } };
  }
}
