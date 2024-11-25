import { FormEvent, ChangeEvent } from 'react';
import CreateBookDto from '../../interfaces/book-dto';
import { Field } from '../Field/Field';
import { FieldImage } from '../FieldImage/FieldImage';
import { FieldMultiOption } from '../FieldMultiOption/FieldMultiOption';
import styles from './bookForm.module.css';
import { FieldSelect } from '../FieldSelect/FieldSelect';
import { locationOptions } from '../../constants/locationOptions';
import { stateOptions } from '../../constants/stateOptions';
import { FieldTextArea } from '../FieldTextArea/FieldTextArea';
import { Loading } from '../Loading/Loading';
import { Modal } from '../Modal/Modal';


interface BookFormProps {
    onSubmit: (e: FormEvent<HTMLButtonElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    book: CreateBookDto;
    isEdit: boolean;
    searchSummary: (title: string, author: string) => void;
    image: File | undefined;
    setImage: React.Dispatch<File | undefined>
    genres: string[];
    setGenres: React.Dispatch<string[]>;
    loading: boolean,
    error: string,
    setError: React.Dispatch<string>    
}

const BookForm: React.FC<BookFormProps> = ({
    onSubmit,
    onChange,
    book,
    isEdit,
    searchSummary,
    genres,
    setGenres,
    image,
    setImage,
    loading,
    error,
    setError
}) => {
    
    
    return (
        <div className={`container`}>
             {
                error  && <Modal handleClose={() => setError('')} size='sm'>
                    <p>{error}</p>
                </Modal>
            }
            <form className={`form ${styles.form}`} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}>
                <h1 className={styles.title}>{isEdit ? 'Edit Book' : 'Create Book'}</h1>
                <Field
                    name='title'
                    type='text'
                    label='Title'
                    placeholder='Title'
                    handleChange={onChange}
                    value={book.title}
                    required={true}
                />
                <Field
                    name='author'
                    type='text'
                    label='Author'
                    placeholder='Author'
                    handleChange={onChange}
                    value={book.author}
                    required={true}
                />

                <FieldImage
                    image={image}
                    setImage={setImage}
                    label='Cover'
                    accept='image/*'
                    initialImage={book.image}
                    
                />
                <FieldMultiOption
                    label='Genre'
                    name='genre'
                    placeholder=''
                    selections={genres}
                    setSelections={setGenres}
                    maxSelection={8}
                    minSelection={1}
                   
                />
                <FieldSelect
                    handleChange={onChange}
                    label='Location'
                    name='location'
                    value={book.location}
                    options={locationOptions}
                    required={true}
                />
                <FieldSelect
                    handleChange={onChange}
                    label='State'
                    name='state'
                    value={book.state}
                    options={stateOptions}
                    required={true}
                />
                <FieldTextArea
                    label='Summary'
                    name='summary'
                    maxLength={1000}
                    value={book.summary}
                    handleChange={onChange}
                    required={true}
                />
                {loading && <Loading />}
                <button className={styles.button} onClick={(e) => { e.preventDefault(); searchSummary(book.title, book.author) }}>Search</button>
                <button className={`btn btn-primary ${styles.btn}`} type="submit" onClick={onSubmit}>{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )

};
export default BookForm;