import axios from "axios";
const baseURL = import.meta.env.DEV ? `http://localhost:4000/api/v1` : ``;
export const api = axios.create({ baseURL, withCredentials: true });
api.interceptors.request.use((config) => {
    config.headers.token = localStorage.getItem('token');
    return config;
});