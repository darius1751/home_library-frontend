import { api } from "../config/api";
import { User, CreateUserDto } from "../interfaces";

export const register = async (createUserDto: CreateUserDto) => {
    const { data, status } = await api.post<User>('/user', createUserDto);
    return { data, status }
}

export const updateById = async (id: string, createUserDto: CreateUserDto) => {
    const { data, status } = await api.put<User>(`/user/${id}`, createUserDto);
    return { data, status }
}

export const findById = async (id: string) => {
    const { data, status } = await api.get<User>(`/user/${id}`);
    return { data, status }
}