
import { useForm } from '../../hooks/useForm';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/contexts';
import { createBook } from '../../services/book';
import BookForm from '../../components/BookForm/BookForm';
import { useNavigate } from 'react-router-dom';
import responseGenerate from '../../config/openAI';

const CreateBook = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const initialBook = {
        title: '',
        author: '',
        genres: [''],
        summary: '',
        image: '',
        location: '',
        state: '',
        user: ''
    }
    const { form, handleChange, setForm } = useForm(initialBook);
    const [image, setImage] = useState<File | undefined>();
    const [genres, setGenres] = useState<string[]>([]);
    const [error, setError] = useState('')
    const isEdit = false

    const searchSummary = async () => {
        const summary = await responseGenerate(form.title, form.author)
        setForm({ ...form, summary: summary || '' });
    }


    const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // validations()
        try {
            const formData = new FormData();
            const { title, author, location, state, summary } = form;

            const imageBlob = new Blob([image!], { type: image!.type });
            formData.append("title", title);
            formData.append("author", author);
            formData.append("location", location);
            formData.append("state", state)
            formData.append("summary", summary);
            formData.append("user", user._id!);
            formData.append("cover", imageBlob);
            genres.forEach((genre, index) => {
                formData.append(`genres[${index}]`, genre);
            });
            // formData.append("genres", JSON.stringify(genres))
            const book = await createBook(formData);
            console.log("book", { book });
            navigate(`/dashboard/books/${user._id}`);

        }
        catch (error) {
            console.log({ error })
            setError(JSON.stringify(error))
        }
    }
    return (
        <div>
            <BookForm
                onSubmit={handleSubmit}
                onChange={handleChange}
                book={form}
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
};

export default CreateBook