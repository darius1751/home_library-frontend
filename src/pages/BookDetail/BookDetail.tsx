import { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom";
import { getOneBook } from "../../services/book";
import { UserContext } from "../../context/contexts";
import BookDto from "../../interfaces/book-dto";
import styles from './bookDetail.module.css'

const BookDetail = () => {
    const {id} = useParams();
    const [book, setBook] = useState<BookDto>({
        title: '',
        author: '',
        summary: '',
        image: '',
        genre: [],
        user: '',
        location: '',
        state: '',
    })
    const [error, setError] = useState('');
 
    const {user} = useContext(UserContext);
    useEffect (() => {
        const getBook = async () => {
            try {
                const response = await getOneBook(id || '');
                console.log(response)
                setBook(response)
            } catch (error) {
                console.log(error)
                setError('Book not found')
            }
        }
        getBook();
    }, [])
    return (
       
        <div className={styles.row}>
            <div className={styles.top}>
            <img src={book.image} alt={book.title} className={styles.image}/>
            </div>
            
        <div className={styles.column}>
            <div className={styles.detail}>
            <h2 className={styles.title + ' ' + styles.top}>{book.title}</h2>
            <h2 className={styles.title}>By {book.author}</h2>
            </div>
            <div className={styles.detail}>
            <p>{book.summary}</p>
            </div>
            <div className={styles.detail}>
            <p><span className={styles.orange}>Genres: </span>{book.genre}</p>
            <p><span className={styles.orange}>Location: </span> {book.location}</p>
            <p><span className={styles.orange}>State: </span>{book.state}</p>
            </div>
            <div className={styles.row}>
            <Link className={styles.link} to={`/books/${user._id}`}>Back</Link>
            <Link className={styles.link} to={`/update/${id}`}>Update</Link>
            {error && <p>{error}</p>}
            </div>
        </div>
        </div>
        
    )
}

export default BookDetail