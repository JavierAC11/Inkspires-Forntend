import axios from 'axios';

export const  getHasLike = async (postId, token) => {
        try {
            const response = await axios.get(`http://localhost/api/posts/${postId}/has-liked`, {
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