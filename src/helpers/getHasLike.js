import axios from 'axios';

export const  getHasLike = async (postId, token) => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
        try {
            const response = await axios.get(`${apiUrl}/posts/${postId}/has-liked`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            return response.data.has_liked;
        } catch (error) {
            console.error('Error fetching like status:', error);
            return false; 
        }
    

}