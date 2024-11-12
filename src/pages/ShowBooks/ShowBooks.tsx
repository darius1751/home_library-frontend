import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { getAllBooksByUserId } from "../../services/book";
import BookDto from "../../interfaces/book-dto";
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
        <div>
            <h1>My Books</h1>
            {
            books.map((book: BookDto) => (
                <div key={book._id}>
                    <h2>{book.title}</h2>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                    <p>{book.summary}</p>
                    <img src={book.image} alt={book.title} />
                    <p>{book.location}</p>
                    <p>{book.state}</p>
                    <Link to={`books/${book._id}`}>Detail</Link>
                </div>
            ))
        }
        </div>
    )
}

export default ShowBooks