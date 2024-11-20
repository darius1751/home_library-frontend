import { FormEvent, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBook, getOneBook } from "../../services/book";
import { UserContext } from "../../context/contexts";
import BookForm from "../../components/BookForm/BookForm";
import { ChangeEvent } from 'react';
import responseGenerate from "../../config/openAI";



const UpdateBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState({
        title: '',
        author: '',
        genres: [''],
        summary: '',
        image: '',
        location: '',
        state: '',
        user: ''
    })

    const [error, setError] = useState('');
    const [genres, setGenres] = useState<string[]>([]);
    const [image, setImage] = useState<File | undefined>();
    const navigate = useNavigate();
    const isEdit = true
    const { user } = useContext(UserContext);

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await getOneBook(id || '');
                setGenres(response.genres);
                setBook(response);
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

    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            // validations();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formData = new FormData();
            const { title, author, location, state, summary } = book;
            if (image) {
                const imageBlob = new Blob([image!], { type: image!.type });
                console.log("Ingresa");
                formData.append("cover", imageBlob);
            }
            formData.append("title", title);
            formData.append("author", author);
            formData.append("location", location);
            formData.append("state", state);
            formData.append("summary", summary);
            formData.append("user", user._id!);
            genres.forEach((genre, index) => {
                formData.append(`genres[${index}]`, genre);
            });
            console.log("BOOK", book) //con info
            const response = await updateBook(id || '', formData)
            console.log({ response });

            navigate(`/dashboard/books/${user._id}`);

        }
        catch (error) {
            console.log(error)
            setError(JSON.stringify(error))
        }
    }

    return (
        <div className={`dashboard`}>
            <div>UpdateBook</div>
            <BookForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                book={book}
                isEdit={isEdit}
                searchSummary={searchSummary}
                genres={genres}
                setGenres={setGenres}
                image={image}
                setImage={setImage}
            />
            {error && <p>{error}</p>}
        </div>

    )
}

export default UpdateBook;