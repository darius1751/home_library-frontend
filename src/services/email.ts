import { api } from "../config/api";

export const sendBookEmail = async (sender: string, receiver: string, name:string, friend:string, lastname:string, id: string) => {
    const response = await api.post('/email', { sender, receiver, name, friend, lastname, id })
    return response.data
}