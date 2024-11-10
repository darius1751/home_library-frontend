import { api } from "../config/api";
import { User, CreateUserDto } from "../interfaces";

export const register = async (createUserDto: CreateUserDto) => {
    const { data, status } = await api.post<User>('/user', createUserDto);
    return { data, status }
}