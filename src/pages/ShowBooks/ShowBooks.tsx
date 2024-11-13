import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { deleteBook, getAllBooksByUserId } from "../../services/book";
import BookDto from "../../interfaces/book-dto";
import styles from './showbooks.module.css'
const ShowBooks = () => {
    const {id} = useParams();
    const [books, setBooks] = useState([]);

useEffect (() => {
    const getBooks = async () => {
        try {
            const response = await getAllBooksByUserId(id || '');
            console.log("RESPONSE", response)
            setBooks(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getBooks();
}, [])

const eraseBook = async (id: string) => {
    try {
      await deleteBook(id || '');
      setBooks(books.filter((book: BookDto) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Books</h1>
            <div className={styles.row}>    
            {
            books.map((book: BookDto) => (
                <div key={book._id} className={styles.card}>
                    <img src={book.image} alt={book.title} />
                    <div className={styles.classDetail}>
                    <p><span className={styles.orange}>Title: </span>{book.title}</p>
                    <p><span className={styles.orange}>Author: </span>{book.author}</p>
                    <p><span className={styles.orange}>Genres: </span>{book.genre}</p>
                    <p><span className={styles.orange}>Location: </span>{book.location}</p>
                    <p><span className={styles.orange}>State: </span>{book.state}</p>
                    </div>
                    <div className={styles.column}>
                    <button  onClick={() => eraseBook(book._id || '123')} className={styles.orange + ' ' + styles.noBtn}>Delete</button>
                    <Link to={`/dashboard/books/detail/${book._id}`} className={styles.orange + ' ' + styles.link}>See more</Link>
                    </div>
                </div>
            ))
        }
        </div>
        </div>
    )
}

export default ShowBooks