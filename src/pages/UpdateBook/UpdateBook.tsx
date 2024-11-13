import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook, getOneBook } from "../../services/book";
import { UserContext } from "../../context/contexts";
import BookForm from "../../components/BookForm/BookForm";
import { ChangeEvent } from 'react';
import responseGenerate from "../../config/openAI";

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

    const searchSummary = async () => {
        const summary = await responseGenerate(book.title, book.author)
        book.summary = summary || '';
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            const { title, author, genre, location, state, summary } = book;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $inputImage: any = e.currentTarget.querySelector('input[name="image"]');
            const image = $inputImage.files[0];
            const imageBlob = new Blob([image], { type: image.type });
            formData.append("title", title);
            formData.append("author", author);
            formData.append("genre", JSON.stringify(genre));
            formData.append("location", location);
            formData.append("state", state)
            formData.append("summary", summary);
            formData.append("user", user._id!);
            formData.append("image", imageBlob);
              await updateBook(id || '', formData)
           
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
        <BookForm onSubmit={handleSubmit} onChange={handleChange} book={book} isEdit={isEdit} searchSummary={searchSummary} />
        {error && <p>{error}</p>}
        </div>

    )
}

export default UpdateBook