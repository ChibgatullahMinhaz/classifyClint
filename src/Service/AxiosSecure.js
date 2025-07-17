import axios from "axios";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosSecure.interceptors.request.use(
    async (config) => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const token = await user.getIdToken();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        } catch (error) {
            console.error("Failed to get Firebase token:", error);
            return config;
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            console.error("Unauthorized access - logging out");
            // এখানে তুমি চাইলে localStorage clear করতে পারো বা login page এ redirect দিতে পারো
        }
        return Promise.reject(error);
    }
);

export default axiosSecure;
