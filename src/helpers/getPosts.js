import axios from 'axios';


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
