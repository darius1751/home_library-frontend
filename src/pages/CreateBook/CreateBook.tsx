
import { useForm } from '../../hooks/useForm';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/contexts';
import { createBook } from '../../services/book';
import BookForm from '../../components/BookForm/BookForm';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const { user } = useContext(UserContext);
    console.log("CREAR", {user})
    const navigate = useNavigate();
    const initialBook = {
        title:'',
        author:'',
        genre: [''],
        summary:'',
        image:'',
        location:'',
        state:'',
        user: ''
    }
    const { form, handleChange } = useForm(initialBook);
    const [error, setError] = useState('')
    const isEdit = false
   

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.set('title', form.title);
            formData.set('author', form.author);
            formData.set('summary', form.summary);
            formData.set('genre', JSON.stringify(form.genre));
            formData.set('location', form.location);
            formData.set('state', form.state);
            formData.set('user', user!._id || '');
            const imageBlob = new Blob([form.image]);
            formData.set('image', imageBlob);
            console.log(URL.createObjectURL(imageBlob))
            const book = await createBook(formData)
            console.log({book, form})
            navigate(`/books/${user._id}`)
            
        }    
        catch (error) { 
            console.log(error)
            setError(JSON.stringify(error))
        }
    }
    return (
        <div>
            <BookForm onSubmit={handleSubmit} onChange={handleChange} book={form} isEdit={isEdit}></BookForm>
            {error && <p>{error}</p>}
        </div>
    )
};

export default CreateBook