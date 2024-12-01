import { api } from "../config/api";
import BookDto from "../interfaces/book-dto";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const createBook = async (formData: FormData) => {
    try {
    const response = await api.post<BookDto>('/books', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response;
    } catch (error) {
    throw errorManagement(error)
    }  
}

export const getAllBooks = async () => {
    try {
    const response = await api.get('/books')
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}

export const getOneBook = async (id: string) => {
    try{
    const response = await api.get<BookDto>(`/books/${id}`)
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}

export const getAllBooksByUserId = async (id: string) => {
    try {
        const response = await api.get(`/books/user/${id}`)
        return response
    } catch (error) {
        throw errorManagement(error)
    }
   
}

export const getAllBooksByGenre = async (genre: string) => {
    try {
    const response = await api.get(`/books/genre/${genre}`)
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}

export const updateBook = async (id: string, book: FormData) => {
    try{
    const response = await api.patch(`/books/${id}`, book)
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}

export const deleteBook = async (id: string) => {
    try {
    const response = await api.delete(`/books/${id}`)
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}

export const addGenre = async (id: string, genre: string) => {
    try {
    const response = await api.put(`/books/genre/${id}`, { genre })
    return response.data
    } catch (error) {
    throw errorManagement(error)
    }
}



