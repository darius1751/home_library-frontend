import { api } from "../config/api"

export const getAllAvatars = async () => {
    const { data } = await api.get<string[]>('/avatars');
    return data;
}