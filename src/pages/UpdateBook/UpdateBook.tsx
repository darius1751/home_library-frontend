import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook, getOneBook } from "../../services/book";
import { UserContext } from "../../context/contexts";
import BookForm from "../../components/BookForm/BookForm";
import { ChangeEvent } from 'react';

const UpdateBook = () => {

    const {id} = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        genre: [''],
        summary: '',
        image: '',
        location: '',
        state: '',
        user: ''
    })
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isEdit = true
    const { user } = useContext(UserContext);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    useEffect (() => {
        const getBook = async () => {
            try {
                const response = await getOneBook(id || '');
                setBook(response)
            } catch (error) {
                console.log(error)
            }
        }
        getBook();
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
           
              await updateBook(id || '', book)
           
            navigate(`/books/${user._id}`)
            
        }    
        catch (error) { 
            console.log(error)
            setError(JSON.stringify(error))
        }
    }

    return (
        <div>
        <div>UpdateBook</div>
        <BookForm onSubmit={handleSubmit} onChange={handleChange} book={book} isEdit={isEdit} />
        {error && <p>{error}</p>}
        </div>

    )
}

export default UpdateBook