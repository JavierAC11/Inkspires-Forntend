import axios from "axios";
import { useAuthStore } from "../store/authStore";

/**
 * Funcion que obtiene el usuario logueado
 * @returns {Promise<object>}
 */


export const getMe = async () => {
    const { token, isLogin } = useAuthStore();
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!isLogin) {
        return;
    }
    try {
        const response = await axios.get(`${apiUrl}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error
    }
    }