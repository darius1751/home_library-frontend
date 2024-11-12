import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAllBooksByUserId } from "../../services/book";
import BookDto from "../../interfaces/book-dto";
import styles from './showbooks.module.css'
const ShowBooks = () => {
    const {id} = useParams();
    const [books, setBooks] = useState([]);

useEffect (() => {
    const getBooks = async () => {
        try {
            const response = await getAllBooksByUserId(id || '');
            setBooks(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    getBooks();
}, [])

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
                    
                    <Link to={`/books/detail/${book._id}`} className={styles.orange + ' ' + styles.link}>See more</Link>
                </div>
            ))
        }
        </div>
        </div>
    )
}

export default ShowBooks