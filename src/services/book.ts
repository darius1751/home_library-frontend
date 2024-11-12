import CreateBookDto from "../interfaces/book-dto";
import { api } from "../config/api";

export const createBook = async (book: CreateBookDto) => {
    const response = await api.post('/books', book)
    return response.data
}

export const getAllBooks = async () => {
    const response = await api.get('/books')
    return response.data
}

export const getOneBook = async (id: string) => {
    const response = await api.get(`/books/${id}`)
    return response.data
}

export const getAllBooksByUserId = async (id: string) => {
    const response = await api.get(`/books/user/${id}`)
    return response
}

export const getAllBooksByGenre = async (genre: string) => {
    const response = await api.get(`/books/genre/${genre}`)
    return response.data
}

export const updateBook = async (id: string, book: CreateBookDto) => {
    const response = await api.patch(`/books/${id}`, book)
    return response.data
}

export const deleteBook = async (id: string) => {
    const response = await api.delete(`/books/${id}`)
    return response.data
}

export const addGenre = async (id: string, genre: string) => {
    const response = await api.put(`/books/genre/${id}`, { genre })
    return response.data
}



