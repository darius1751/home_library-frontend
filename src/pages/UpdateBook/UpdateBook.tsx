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
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
        const summary = await responseGenerate(book.title, book.author)
        setLoading(false)
        setBook({ ...book, summary: summary || '' });
    }

    const validate = (formData: FormData) => {
        let currentError = ''
        if(!formData.get('title')) {
            currentError += 'Title is required. '
        }
        if(!formData.get('author')) {
            currentError += 'Author is required. '
        }
        if(!formData.get('location')) {
            currentError += 'Location is required. '
        }
        if(!formData.get('state')) {
            currentError += 'State is required. '
        }
        if(!formData.get('summary')) {
            currentError += 'Summary is required. '
        }
        setError(currentError)
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
            validate(formData)

            await updateBook(id || '', formData)
            

            navigate(`/dashboard/books/${user._id}`);

        }
        catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message + ". Please complete all the fields.");
            } else {
                setError('An unknown error occurred');
            }
            console.log({ e });
        };
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
                loading={loading}
                error={error}
                setError={setError}
            />
            {error && <p>{error}</p>}
        </div>

    )
}

export default UpdateBook;