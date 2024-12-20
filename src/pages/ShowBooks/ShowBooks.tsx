/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useContext } from "react";
import { getAllBooksByUserId } from "../../services/book";
import BookDto from "../../interfaces/book-dto";
import styles from './showBooks.module.css'
import EmailForm from "../../components/EmailForm/EmailForm";
import { UserContext } from "../../context/contexts";
import { CardBook } from "../../components/CardBook/CardBook";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { SEO } from "../../components/SEO/SEO";
const ShowBooks = () => {
    const { user } = useContext(UserContext);
    const params = useParams();
    const id = user?._id ?? params.id;
    const [books, setBooks] = useState<BookDto[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<BookDto[]>([])
    const [loc, setLoc] = useState('');
    const [state, setState] = useState('');
    const [genre, setGenre] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [sort, setSort] = useState('')
    const [seen, setSeen] = useState(false);
    const [error, setError] = useState('');
    const updateBooks = async () => {
        try {
            const response = await getAllBooksByUserId(id || '');
            setBooks(response.data);
            setFilteredBooks(response.data);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(error as string);
            }
            console.log(error)
        }
    }
    useEffect(() => {
        updateBooks();
    }, [])

    useEffect(() => {
        filter()

    }, [loc, state, genre, title, author])

    useEffect(() => {
        if (sort !== '') {
            sortBooks()
        }
    }, [sort])

    const togglePop = () => {
        setSeen(!seen);
    }

    const filter = async () => {
        let filtered: BookDto[] = books
        if (loc !== '') {
            filtered = filtered.filter((book: BookDto) => book.location === loc);
        }
        if (state !== '') {
            filtered = filtered.filter((book: BookDto) => book.state === state);
        }
        if (genre !== '') {
            const filteredGenres = filtered.map((book: BookDto) => ({ ...book, genres: book.genres.filter((g: string) => g.toLowerCase().includes(genre.toLowerCase())) }));
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

    const sortTitle = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.title.localeCompare(b.title));
        setFilteredBooks(sorted);
    }

    const sortAuthor = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => a.author.localeCompare(b.author));
        setFilteredBooks(sorted);
    }

    const sortGenre = async () => {
        const sorted = [...filteredBooks].sort((a: BookDto, b: BookDto) => {
            const genreA = a.genres.join(',').toLowerCase();
            const genreB = b.genres.join(',').toLowerCase();
            return genreA.localeCompare(genreB);
        });
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



    const sortBooks = async () => {
        if (sort === 'title') {
            await sortTitle();
        } else if (sort === 'author') {
            await sortAuthor();
        } else if (sort === 'genre') {
            await sortGenre();
        } else if (sort === 'location') {
            await sortLocation();
        } else if (sort === 'state') {
            await sortState();
        }
    }

    return (
        <div className={`page`}>
            <SEO
                title={`Home Library - Books - ${user.username}`}
                author={user.username}
                description={`All books of ${user.username}`}
                keywords={
                    books
                        .map(({ title }) => title)
                        .join(',')
                        .concat(
                            books.map(({ genres }) => genres).join(',')
                        )
                }
            />
            {
                error && <Modal handleClose={() => setError('')} size='sm'>
                    <p>{error}</p>
                </Modal>
            }
            <div className={`container`}>
                <div className={`${styles.showBooks}`}>


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

                </div>
                <div className={styles.sort + " " + styles.row}>
                    <select id="sort" name="sort" onChange={(e) => setSort(e.target.value)} value={sort} required className={styles.input}>
                        <option value="" className={styles.option + ' ' + styles.orange}>Sort by</option>
                        <option value="title" className={styles.option + ' ' + styles.orange}>Title</option>
                        <option value="author" className={styles.option + ' ' + styles.orange}>Author</option>
                        <option value="genre" className={styles.option + ' ' + styles.orange}>Genre</option>
                        <option value="location" className={styles.option + ' ' + styles.orange}>Location</option>
                        <option value="state" className={styles.option + ' ' + styles.orange}>State</option>
                    </select>
                    {!seen && <button onClick={togglePop}>Send List to Friend</button>}
                    {seen ? <EmailForm toggle={togglePop} id={id || ''} setError={setError} /> : null}
                </div>
                {
                    filteredBooks.length === 0 ? <h2 className={styles.noBooks}>No books found</h2> :
                        <div className={styles.cards}>
                            {
                                filteredBooks.length === 0 ? <h2 className={styles.noBooks}>No books found</h2> :
                                    <div className={styles.cards}>
                                        {
                                            filteredBooks.map((book, index) => <CardBook key={`cardBook-${index}`} book={book} setFilteredBooks={setFilteredBooks} books={filteredBooks} />)
                                        }
                                    </div>
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default ShowBooks