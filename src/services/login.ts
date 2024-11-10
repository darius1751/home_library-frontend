import { Credential } from "../interfaces/credential";
import { api } from "../config/api";
import { User } from "../interfaces/user";

export const login = async (credential: Credential) => {
    const { data, status } = await api.post<User>('/auth/login', credential);
    return { data, status }
}