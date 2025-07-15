import axios from "axios";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

axiosSecure.interceptors.request.use(
    async (config) => {
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
);
// response interceptors
axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Handle unauthorized error globally
            // Example: logout user, show toast, redirect to login
            console.error('Unauthorized access - logging out');
            // Optional: clear localStorage or redirect
        }
        return Promise.reject(error);
    }
);

export default axiosSecure;