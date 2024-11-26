/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../config/api";

const errorManagement = (error: any) => {
    if(error.request?.status === 403) {
        return "Invalid token. You don't have permission."
    }

    if(error.request?.status === 404 || error.request?.status === 401) {
        console.log(import.meta.env.VITE_API_BASE_URL)
        return "Not found."
    }
    console.log(error)
    return error.response?.data?.message || "Something went wrong"
}

export const sendBookEmail = async (sender: string, receiver: string, name:string, friend:string, lastname:string, id: string) => {
    try {
    const response = await api.post('/email', { sender, receiver, name, friend, lastname, id })
    return response
    } catch (error) {
        throw errorManagement(error)
    }
}

export const sendPasswordEmail = async (email: string) => {
    try{
    const response = await api.post('/email/password', { email })
    return response.data
    } catch (error) {
        throw errorManagement(error)
    }
}

export const sendWelcomeEmail = async (email:string) => {
    try {
        const response = await(api.post('/email/welcome', { email }))
        return response.data
    } catch (error) {
        throw errorManagement(error)
    }
 }
