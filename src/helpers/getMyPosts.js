import axios from 'axios';

export const getMyPosts = async (userId, page = 1, perPage = 10) => {
    try {
        const response = await axios.get(`http://localhost/api/users/${userId}/posts?page=${page}&per_page=${perPage}`);
        console.log(response.data);
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
