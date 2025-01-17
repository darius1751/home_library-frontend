import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({ baseURL, withCredentials: true });
api.interceptors.request.use((config) => {
    console.log({ baseURL });
    config.headers.token = localStorage.getItem('token');
    return config;
});