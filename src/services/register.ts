/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";
import { User, CreateUserDto } from "../interfaces";

const errorManagement = (error: any) => {
    if(error.request?.status === 403) {
        return "Invalid token. You don't have permission."
    }

    if(error.request?.status === 404 || error.request?.status === 401) {
        console.log(import.meta.env.VITE_API_BASE_URL)
        return "Not found."
    }
    return error.response?.data?.message || "Something went wrong"
}

export const register = async (createUserDto: CreateUserDto) => {
    try {const { data, status } = await api.post<User>('/user', createUserDto);
        return { data, status }
    } catch (error) {
        throw errorManagement(error);
    }
    
}
export const findById = async (id: string) => {
    try{
        const { data, status } = await api.get<User>(`/user/${id}`);
        return { data, status }
    } catch (error) {
        throw errorManagement(error);
    }
   
}

export const findUserByEmail = async (email: string) => {
    try {
        const { data, status } = await api.get<User>(`/user/email/${email}`);
        return { data, status }
    } catch (error) {
        throw errorManagement(error);
    }
  
}