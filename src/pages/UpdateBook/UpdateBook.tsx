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

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    }

    const searchSummary = async () => {
        const summary = await responseGenerate(book.title, book.author)
         setBook({ ...book, summary: summary || '' });
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $inputImage: any = e.currentTarget.querySelector('input[name="image"]');
            const image = $inputImage.files[0];
            const imageBlob = new Blob([image], { type: image.type });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formData = new FormData();
             const { title, author, location, state, summary } = book;
            const stringify = book.genre.toString();
            const genres = stringify.split(',');

            const genresArray: string[] = []
            genres.forEach((genre: string) => {
                genresArray.push(genre)
            })
            formData.append("title", title);
            formData.append("author", author);
            formData.append("location", location);
            formData.append("state", state);
            formData.append("summary", summary);
            formData.append("user", user._id!);
            formData.append("image", imageBlob);
            
            genresArray.forEach((genre, index) => {
              formData.append(`genre[${index}]`, genre);
            });
            console.log("BOOK", book) //con info
            console.log("FORMDATA", formData) // vacío
            const response = await updateBook(id || '', formData)
            console.log({ response });
           
            navigate(`/dashboard/books/${user._id}`)
            
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