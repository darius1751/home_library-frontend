
import React from 'react';
import { FormEvent, ChangeEvent } from 'react';
import CreateBookDto from '../../interfaces/book-dto';

interface BookFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  book: CreateBookDto;
  isEdit: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, onChange, book, isEdit }) => {
    return (
        <div>
        <h1>{isEdit ? 'Edit Book' : 'Create Book'}</h1>

        <form onSubmit={onSubmit} encType='multipart/form-data'>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={book.title} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <input type="text" id="author" name="author" value={book.author} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="summary">Summary</label>
                <textarea id="summary" name="summary" value={book.summary} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" name="image" value={book.image} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="genre">Genre</label>
                <input type="text" id="genre" name="genre" value={book.genre} onChange={onChange} required />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <select id="location" name="location" value={book.location} onChange={onChange} required>
                    <option value="">Select a location</option>
                    <option value="library">Library</option>
                    <option value="lent">Lent</option>
                    <option value="wishlist">Wishlist</option>
                </select>
            </div>
            <div>
                <label htmlFor="state">State</label>
                <select id="state" name="state" value={book.state} onChange={onChange} required>
                    <option value="">Select a state</option>
                    <option value="read">Read</option>
                    <option value="currently reading">Currently Reading</option>
                    <option value="not finished">Not Finished</option>
                    <option value="unread">Unread</option>
                </select>
            </div>
            <button type="submit">{isEdit ? 'Update' : 'Create'}</button>
        </form>
        </div>
    )

};





export default BookForm