/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { deleteBook, getAllBooksByUserId } from "../../services/book";
import BookDto from "../../interfaces/book-dto";
import styles from './showbooks.module.css'
const ShowBooks = () => {
    const { id } = useParams();
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState<BookDto[]>([])
    const [loc, setLoc] = useState('');
    const [state, setState] = useState('');
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const updateBooks = async () => {
        try {
            const response = await getAllBooksByUserId(id || '');
            // console.log("RESPONSE", response)
            setBooks(response.data)
            setFilteredBooks(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        updateBooks();
    }, [])

    useEffect(() => {
        filter()

    }, [loc, state, genre, title, author])

    const filter = async () => {
        let filtered: BookDto[] = books
        if (loc !== '') {
            filtered = filtered.filter((book: BookDto) => book.location === loc);
        }
        if (state !== '') {
            filtered = filtered.filter((book: BookDto) => book.state === state);
        }
        if (genre !== '') {
            const filteredGenres = filtered.map((book: BookDto) => ({ ...book, genre: book.genres.filter((g: string) => g.toLowerCase().includes(genre.toLowerCase())) }));
            filtered = filteredGenres.filter((book: BookDto) => book.genres.length > 0);
        }
        if (title !== '') {
            filtered = filtered.filter((book: BookDto) => book.title.toLowerCase().includes(title.toLowerCase()));
        }
        if (author !== '') {
            filtered = filtered.filter((book: BookDto) => book.author.toLowerCase().includes(author.toLowerCase()));
        }
        setFilteredBooks(filtered);
    }

    const eraseBook = async (id: string) => {
        try {
            await deleteBook(id || '');
            await updateBooks();
        } catch (error) {
            console.log(error);
        }
    };


    const sortTitle = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.title.localeCompare(b.title));
        setFilteredBooks(sorted);
    }

    const sortAuthor = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.author.localeCompare(b.author));
        setFilteredBooks(sorted);
    }

    const sortGenre = async () => {
        const alfabetized = filteredBooks.map((book: BookDto) => ({ ...book, genre: book.genres.sort() }));
        const sorted = [...alfabetized].sort((a: BookDto, b: BookDto) => a.genres[0].localeCompare(b.genres[0]));
        setFilteredBooks(sorted);
    }

    const sortLocation = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.location.localeCompare(b.location));
        setFilteredBooks(sorted);
    }

    const sortState = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.state.localeCompare(b.state));
        setFilteredBooks(sorted);
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Books</h1>
            <div className={styles.filter + " " + styles.row}>
                <div>
                    <label htmlFor="location" className={styles.label}>Location</label>
                    <select id="location" name="location" onChange={(e) => setLoc(e.target.value)} value={loc} required className={styles.input}>
                        <option value="" className={styles.option}>Search by location</option>
                        <option value="library" className={styles.option}>Library</option>
                        <option value="lent" className={styles.option}>Lent</option>
                        <option value="wishlist" className={styles.option}>Wishlist</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="state" className={styles.label}>State</label>
                    <select id="state" name="state" onChange={(e) => setState(e.target.value)} value={state} required className={styles.input}>
                        <option value="" className={styles.option}>Search by state</option>
                        <option value="read" className={styles.option}>Read</option>
                        <option value="currently reading" className={styles.option}>Currently Reading</option>
                        <option value="not finished" className={styles.option}>Not Finished</option>
                        <option value="unread" className={styles.option}>Unread</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="title" className={styles.label}>Title</label>
                    <input type="text" className={styles.input} placeholder="Search by title" onChange={(e) => setTitle(e.target.value)} value={title} list="titles"></input>
                    <datalist id="titles">
                        {filteredBooks.map((book: BookDto) => (
                            <option key={book._id} value={book.title}></option>
                        ))}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="author" className={styles.label}>Author</label>
                    <input type="text" className={styles.input} placeholder="Search by author" onChange={(e) => setAuthor(e.target.value)} value={author} list="authors"></input>
                    <datalist id="authors">
                        {filteredBooks.map((book: BookDto) => (
                            <option key={book._id} value={book.author}></option>
                        ))}
                    </datalist>
                </div>
                <div>
                    <label htmlFor="genre" className={styles.label}>Genre</label>
                    <input type="text" className={styles.input} placeholder="Search by genre" onChange={(e) => setGenre(e.target.value)} value={genre} list="genres"></input>
                    <datalist id="genres">
                        {filteredBooks.map((book: BookDto) => (
                            <option key={book._id} value={book.genres}></option>
                        ))}
                    </datalist>

                </div>


            </div>
            <div className={styles.btnContainer}>
                <button onClick={sortTitle} className={styles.orange + ' ' + styles.btn}>Sort by title</button>
                <button onClick={sortAuthor} className={styles.orange + ' ' + styles.btn}>Sort by author</button>
                <button onClick={sortGenre} className={styles.orange + ' ' + styles.btn}>Sort by genre</button>
                <button onClick={sortLocation} className={styles.orange + ' ' + styles.btn}>Sort by location</button>
                <button onClick={sortState} className={styles.orange + ' ' + styles.btn}>Sort by state</button>
            </div>

            {filteredBooks.length === 0 ? <h2 className={styles.noBooks}>No books found</h2> :
                <div className={styles.row}>
                    {
                        filteredBooks.map((book: BookDto) => (
                            <div key={book._id} className={styles.card}>
                                <img src={book.image} alt={book.title} />
                                <div className={styles.classDetail}>
                                    <p><span className={styles.orange}>Title: </span>{book.title}</p>
                                    <p><span className={styles.orange}>Author: </span>{book.author}</p>
                                    <p><span className={styles.orange}>Genres: </span>{book.genres}</p>
                                    <p><span className={styles.orange}>Location: </span>{book.location}</p>
                                    <p><span className={styles.orange}>State: </span>{book.state}</p>
                                </div>
                                <div className={styles.column}>
                                    <button onClick={() => eraseBook(book._id || '123')} className={styles.orange + ' ' + styles.noBtn}>Delete</button>
                                    <Link to={`/dashboard/books/detail/${book._id}`} className={styles.orange + ' ' + styles.link}>See more</Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ShowBooks