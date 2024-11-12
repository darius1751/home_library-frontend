
import { useForm } from '../../hooks/useForm';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../../context/contexts';
import { createBook } from '../../services/book';
import BookForm from '../../components/BookForm/BookForm';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const { user } = useContext(UserContext);
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
            const book = await createBook({...form, user: user._id || ''})
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