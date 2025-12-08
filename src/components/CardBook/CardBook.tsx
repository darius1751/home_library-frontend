import { NavLink } from 'react-router-dom';
import BookDto from '../../interfaces/book-dto';
import { locationIcons } from '../../constants/locationOptions';
import { stateIcons } from '../../constants/stateOptions';
import { deleteBook } from '../../services/book';
import styles from './cardBook.module.css';

type Props = {
    book: BookDto;
    type?: 'preview' | 'owner' | 'other';
    setFilteredBooks: (books: BookDto[]) => void;
    books: BookDto[]
}
export const CardBook = ({ book, type = 'owner', setFilteredBooks, books }: Props) => {
    const { _id, author, title, genres, image, location, state } = book;
    const removeBook = async () => {
        try {
            await deleteBook(_id || '');
            const filteredBooks = books.filter((book: BookDto) => book._id !== _id);
                setFilteredBooks(filteredBooks);
            
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.card}>
            <div className={styles.bookTitles}>
            {type === 'owner' && <NavLink to={`/dashboard/book/detail/${_id}`} className={styles.title}>{title}</NavLink>}
            {type === 'preview' && <NavLink to={`#`} className={styles.title}>{title}</NavLink>}
                <span className={styles.author}>{author}</span>
             </div>
             <hr />
            <div className={styles.bookInfo}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.image} />
            </div>
           
            
            <div className={styles.additionalDetails}>
                <div className={styles.detailsBox}>
                <div className={styles.additionalDetail}>
                    <span className={styles.titleAdditionalDetail}>State</span>
                    <img src={stateIcons[state]} alt="state" className={styles.icon} />
                    <span className={styles.valueAdditionalDetail}>{state}</span>
                </div>
                <div className={styles.additionalDetail}>
                    <span className={styles.titleAdditionalDetail}>Location</span>
                    <img src={locationIcons[location]} alt="location" className={styles.icon} />
                    <span className={styles.valueAdditionalDetail}>{location}</span>
                </div>
                </div>
                <div className={`${styles.btnOptions} btnOptions`}>
                {
                    type !== 'preview' && <NavLink to={`/dashboard/book/detail/${_id}`} className={`btn-link btn-square btn-primary book-btn`} >See more</NavLink>
                }
                {
                    type === 'preview' && <NavLink to={`#`} className={`btn-link btn-square btn-primary book-btn`}>See more</NavLink>
                }
                {
                    type === 'owner' && <button className={`btn-square btn-danger book-btn`} onClick={removeBook}>Delete</button>
                }
                {
                    type === 'preview' && < button className={`btn-square btn-danger book-btn book-btn`} onClick={(e) => e.preventDefault()}>Delete</button>
                }
            </div>
            </div>
            
            
            </div>
            <hr />
             <div className={styles.details}>
                <div className={styles.genres}>
                    {
                        genres.map((genre, index) => <span key={`genre-${_id}-${index}`} className={styles.genre}>{genre}</span>)
                    }
                </div>
            </div>
            
        </div >
    )
}