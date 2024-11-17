import { FormEvent, ChangeEvent } from 'react';
import CreateBookDto from '../../interfaces/book-dto';
import { Field } from '../Field/Field';
import styles from './bookForm.module.css';
import { FieldImage } from '../FieldImage/FieldImage';
import { FieldMultiOption } from '../FieldMultiOption/FieldMultiOption';


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
}) => {
    console.log({ book })
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{isEdit ? 'Edit Book' : 'Create Book'}</h1>

            <form className={styles.form} onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                }
            }}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <Field
                            name='title'
                            type='text'
                            label='Title'
                            placeholder='Title'
                            handleChange={onChange}
                            value={book.title}
                        />
                        <Field
                            name='author'
                            type='text'
                            label='Author'
                            placeholder='Author'
                            handleChange={onChange}
                            value={book.author}
                        />

                        <div className={styles.row}>
                            <label className={styles.label} htmlFor="summary">Summary</label>
                            <div className={styles.buttonRow}>
                                <textarea
                                    name='summary'
                                    rows={6}
                                    placeholder='Summary'
                                    onChange={onChange}
                                    value={book.summary}
                                    className={styles.textarea}
                                />
                                <button className={styles.button} onClick={() => { searchSummary(book.title, book.author) }}>Search</button>
                            </div>

                        </div>
                    </div>

                    <div className={styles.column}>
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
                        <div>
                            <label htmlFor="location" className={styles.label}>Location</label>
                            <select id="location" name="location" value={book.location} onChange={onChange} required className={styles.input}>
                                <option value="" className={styles.option}>Select a location</option>
                                <option value="library" className={styles.option}>Library</option>
                                <option value="lent" className={styles.option}>Lent</option>
                                <option value="wishlist" className={styles.option}>Wishlist</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="state" className={styles.label}>State</label>
                            <select id="state" name="state" value={book.state} onChange={onChange} required className={styles.input}>
                                <option value="" className={styles.option}>Select a state</option>
                                <option value="read" className={styles.option}>Read</option>
                                <option value="currently reading" className={styles.option}>Currently Reading</option>
                                <option value="not finished" className={styles.option}>Not Finished</option>
                                <option value="unread" className={styles.option}>Unread</option>
                            </select>
                        </div>

                    </div>
                </div>

                <button className={`btn btn-primary ${styles.btn}`} type="submit" onClick={onSubmit}>{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )

};





export default BookForm