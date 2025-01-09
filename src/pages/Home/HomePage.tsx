import { Footer } from '../../components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Section } from './components/Section/Section';
import bookIcon from '../../assets/icons/booksIcon.svg';
import envelope from '../../assets/icons/envelope.svg';
import wishListIcon from '../../assets/icons/wishlistIcon.svg';
import styles from './home.module.css';
import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Cite } from './components/Cite/Cite';
import { SEO } from '../../components/SEO/SEO';

export const HomePage = () => {
    return (
        <>
            <SEO
                description='Home library, your app for keep control of your books, share with your friends, create wishlists, send email to friends about your custom books, own personal library'
                keywords='home-library, home library, favorite books, keep control of your books, share with your friends, create wishlist books, manage my own books'
            />
            <div className={`page public-page`}>
                <div className={`container`}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Home Library</h2>
                        <span className={styles.motto}>Organize your dreams</span>
                    </div>
                    <div className={styles.box}>
                        <Hero />

                    </div>
                    <div className={`${styles.sections} ${styles.box}`}>
                        <Section
                            title='Library Administration'
                            src={bookIcon}
                            alt="Books"
                            description="We offer you the complete ease of managing the information in your personal library, adapting it to your needs and having control over reading, book status and much more."
                        />
                        <Section
                            title='Share your library'
                            src={envelope}
                            alt="Share"
                            description="Share with your friends information about the books you have in your personal library, your future acquisitions and relevant information about your books."
                        />
                        <Section
                            title='Favorite Books and future acquisitions (Wishlists)'
                            src={wishListIcon}
                            alt="WishList"
                            description="Project your future books to obtain, share information about your favorite books, if they are in your personal library or in your future plans."
                        />
                    </div>

                    <Carrousel>
                        <Cite creator='C.S. Lewis' text='We read to know we are not alone.' />
                        <Cite creator='Cicero' text='A room without books is like a body without a soul.' />
                        <Cite creator='John Steinbeck' text='I guess there are never enough books.' />
                        <Cite creator='Jhumpa Lahiri' text='That’s the thing about books. They let you travel without moving your feet.' />
                        <Cite creator='Philip Pullman' text='We don’t need a list of rights and wrongs, tables of dos and don’ts: We need books, time, and silence. Thou shalt not is soon forgotten, but Once upon a time lasts forever.' />
                    </Carrousel>



                </div>
                <Footer className={styles.footer} />
            </div>
        </>
    )
}