import { Credential } from "../interfaces/credential";
import { api } from "../config/api";
import { User } from "../interfaces/user";

export const login = async (credential: Credential) => {
    const { data, status } = await api.post<{ user: User, token: string }>('/auth/login', credential);
    return { data, status }
}

export const updateOne = async (id: string, credential: Credential) => {
    try {
        const response = await api.put(`/auth/reset-password/${id}`, credential);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getOneByUser = async (id: string) => {
    try {
        const response = await api.get(`/auth/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}