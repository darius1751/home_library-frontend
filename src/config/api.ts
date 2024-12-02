import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL as string;
export const api = axios.create({ baseURL, withCredentials: true });
api.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem('token');
    return config;
});