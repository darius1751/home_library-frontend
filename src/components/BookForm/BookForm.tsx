
import React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import CreateBookDto from '../../interfaces/book-dto';
import { Field } from '../Field/Field';
import styles from './bookForm.module.css';

interface BookFormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    book: CreateBookDto;
    isEdit: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, onChange, book, isEdit }) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{isEdit ? 'Edit Book' : 'Create Book'}</h1>

            <form onSubmit={onSubmit} className={styles.form}>
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

                        <div>
                            <label className={styles.label} htmlFor="summary">Summary</label>
                            <textarea
                                name='summary'
                                rows={6}
                                placeholder='Summary'
                                onChange={onChange}
                                value={book.summary}
                                className={styles.textarea}
                            />
                        </div>
                    </div>

                    <div className={styles.column}>


                        <Field
                            name='image'
                            type='file'
                            label='Image'
                            placeholder='Image'
                            handleChange={onChange}
                            value={book.image}
                            accept='image/*'
                        />
                        <Field
                            name='genre'
                            type='text'
                            label='Genre'
                            placeholder='Genre'
                            handleChange={onChange}
                            value={book.genre}
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

                <button className={`btn btn-primary ${styles.btn}`} type="submit">{isEdit ? 'Update' : 'Create'}</button>
            </form>
        </div>
    )

};





export default BookForm