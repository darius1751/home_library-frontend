import { NavLink } from 'react-router-dom';
import BookDto from '../../interfaces/book-dto';
import styles from './cardBook.module.css';
import { locationIcons } from '../../constants/locationOptions';
import { stateIcons } from '../../constants/stateOptions';
import { deleteBook } from '../../services/book';

type Props = {
    book: BookDto;
}
export const CardBook = ({ book }: Props) => {
    const { _id, author, title, genres, image, location, state } = book;
    const removeBook = async () => {
        try {
            await deleteBook(_id || '');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.image} />
            </div>
            <div className={styles.details}>
                <NavLink to={`/dashboard/book/detail/${_id}`} className={styles.title}>{title}</NavLink>
                <span className={styles.author}>{author}</span>
                <div className={styles.genres}>
                    {
                        genres.map((genre, index) => <span key={`genre-${_id}-${index}`} className={styles.genre}>{genre}</span>)
                    }
                </div>
            </div>
            <hr />
            <div className={styles.additionalDetails}>
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
            <hr />
            <div className={`btnOptions ${styles.btnOptions}`}>
                <NavLink to={`/dashboard/book/detail/${_id}`} className={`btn-link btn-square btn-primary`}>See more</NavLink>
                <button className={`btn-square btn-danger`} onClick={removeBook}>Delete</button>
            </div>
        </div>
    )
}