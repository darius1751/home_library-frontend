import { Footer } from '../../components/Footer/Footer';
import { Hero } from './components/Hero/Hero';
import { Section } from './components/Section/Section';
import bookIcon from '../../assets/icons/booksIcon.svg';
import envelope from '../../assets/icons/envelope.svg';
import wishListIcon from '../../assets/icons/wishlistIcon.svg';
import styles from './home.module.css';
import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Cite } from './components/Cite/Cite';

export const HomePage = () => {
    return (
        <>
            <div className={`page ${styles.page}`}>
                <div className={`container`}>
                    <Hero />
                    <div className={styles.sections}>
                        <Section
                            src={bookIcon}
                            alt="Books"
                            description="Keep control of your books"
                        />
                        <Section
                            src={envelope}
                            alt="Share"
                            description="Share with your friends"
                        />
                        <Section
                            src={wishListIcon}
                            alt="WishList"
                            description="Create wishlists"
                        />

                        <Carrousel>
                            <Cite creator='C.S. Lewis' text='We read to know we are not alone.' />
                            <Cite creator='Cicero' text='A room without books is like a body without a soul.' />
                            <Cite creator='John Steinbeck' text='I guess there are never enough books.' />
                            <Cite creator='Jhumpa Lahiri' text='That’s the thing about books. They let you travel without moving your feet.' />
                            <Cite creator='Philip Pullman' text='We don’t need a list of rights and wrongs, tables of dos and don’ts: We need books, time, and silence. Thou shalt not is soon forgotten, but Once upon a time lasts forever.' />
                        </Carrousel>
                    </div>


                </div>
                <Footer className={styles.footer} />
            </div>
        </>
    )
}