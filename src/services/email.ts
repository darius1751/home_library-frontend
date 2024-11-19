import { api } from "../config/api";

export const sendBookEmail = async (sender: string, receiver: string, name:string, friend:string, id: string) => {
    const response = await api.post('/email', { sender, receiver, name, friend, id })
    return response.data
}