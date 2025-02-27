import axios from "axios";
import { useAuthStore } from "../store/authStore";

export const getMe = async () => {
    const { token } = useAuthStore();

    try {
        const response = await axios.get("http://localhost/api/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    }