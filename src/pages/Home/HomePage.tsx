import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Cite } from './components/Cite/Cite';
import styles from './home.module.css';

export const HomePage = () => {
    return (
        <>
            <div className={`page ${styles.page}`}>
                <div className={`container`}>
                    <Carrousel>
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 1'/>
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 2'/>
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 3'/>
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 4'/>
                    </Carrousel>
                </div>
            </div>
        </>
    )
}