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
         setBook({ ...book, summary: summary || '' });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            
            const stringify = book.genre.toString();
            const genres = stringify.split(',');
            console.log("GENRES", genres)

            const genresArray: string[] = []
            genres.forEach((genre) => {
                genresArray.push(genre)
            })
        
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $inputImage: any = e.currentTarget.querySelector('input[name="image"]');
            const image = $inputImage.files[0];
            const imageBlob = new Blob([image], { type: image.type });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
           
            setBook({...book, genre:[...genresArray], image: imageBlob})

           
              const response =await updateBook(id || '', book)
              console.log(response)

           
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