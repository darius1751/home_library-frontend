/* eslint-disable @typescript-eslint/no-explicit-any */
import { Credential } from "../interfaces/credential";
import { api } from "../config/api";
import { User } from "../interfaces/user";

const errorManagement = (error: any) => {
    if (error.request?.status === 403) {
        return "Invalid token. You don't have permission."
    }

    if (error.request?.status === 404) {
        return "Not found."
    }

    if (error.request?.status === 401) {
        return "Unauthorized"
    }
    return error.response?.data?.message || "Something went wrong."
}

export const login = async (credential: Credential) => {
    try {
        const { data, status } = await api.post<{ user: User, token: string }>('/auth/login', credential);
        
        return { data, status }
    } catch (error) {
        console.log({error});
        throw errorManagement(error)
    }
}

export const updateOne = async (id: string, credential: Credential, token: string) => {
    try {
        const response = await api.put(`/auth/reset-password/${id}?${token}`, credential);
        console.log("serviceCredential", response)
        return response.data;
    } catch (error) {
        throw errorManagement(error)
    }
}

export const getOneById = async (id: string) => {
    try {
        const response = await api.get(`/auth/${id}`);
        return response.data;
    } catch (error) {
        throw errorManagement(error)
    }
}