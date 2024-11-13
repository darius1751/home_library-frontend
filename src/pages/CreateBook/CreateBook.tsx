
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
        genre: [''],
        summary: '',
        image: '',
        location: '',
        state: '',
        user: ''
    }
    const { form, handleChange, setForm } = useForm(initialBook);
    const [error, setError] = useState('')
    const isEdit = false

    const searchSummary = async () => {
        const summary = await responseGenerate(form.title, form.author)
        setForm({ ...form, summary: summary || '' });
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            const { title, author, genre, location, state, summary } = form;
            const stringify = genre.toString();
            const genres = stringify.split(',');

            const genresArray: string[] = []
            genres.forEach((genre: string) => {
                genresArray.push(genre)
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $inputImage = e.currentTarget.querySelector<any>('input[name="image"]')!;
            const image = $inputImage.files[0];
            const imageBlob = new Blob([image], { type: image.type });
            formData.append("title", title);
            formData.append("author", author);
            formData.append("location", location);
            formData.append("state", state)
            formData.append("summary", summary);
            formData.append("user", user._id!);
            formData.append("image", imageBlob);
            genresArray.forEach((genre, index) => {
                formData.append(`genre[${index}]`, genre);
              });
            const book = await createBook(formData)
            console.log({ book });
            navigate(`/dashboard/books/${user._id}`)

        }
        catch (error) {
            console.log(error)
            setError(JSON.stringify(error))
        }
    }
    return (
        <div>
            <BookForm onSubmit={handleSubmit} onChange={handleChange} book={form} isEdit={isEdit} searchSummary={searchSummary}></BookForm>
            {error && <p>{error}</p>}
        </div>
    )
};

export default CreateBook