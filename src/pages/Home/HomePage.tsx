import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Footer } from '../../components/Footer/Footer';
import { Cite } from './components/Cite/Cite';
import styles from './home.module.css';

export const HomePage = () => {
    return (
        <>
            <div className={`page ${styles.page}`}>
                <div className={`container`}>
                    <Carrousel>
                        <Cite creator='C.S. Lewis' text='We read to know we are not alone.' />
                        <Cite creator='Cicero' text='A room without books is like a body without a soul.' />
                        <Cite creator='Jhumpa Lahiri' text='That’s the thing about books. They let you travel without moving your feet.' />
                        <Cite creator='Philip Pullman' text='We don’t need a list of rights and wrongs, tables of dos and don’ts: We need books, time, and silence. Thou shalt not is soon forgotten, but Once upon a time lasts forever.' />
                    </Carrousel>
                </div>
                <Footer />
            </div>
        </>
    )
}