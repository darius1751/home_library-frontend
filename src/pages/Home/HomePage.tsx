import { Carrousel } from '../../components/Carrousel/Carrousel';
import { Slider } from '../../components/Slider/Slider';
import { Cite } from './components/Cite/Cite';
import styles from './home.module.css';

export const HomePage = () => {
    return (
        <>
            <div className={`page ${styles.page}`}>
                <div className={`container`}>
                    <Slider>
                        <div>Slide 1</div>
                        <div>Slide 2</div>
                        <div>Slide 3</div>
                        <div>Slide 4</div>
                    </Slider>
                    <Carrousel>
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 1' />
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 2' />
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 3' />
                        <Cite creator='darius1751' text='La programacion es mas bonita cuando piensas tu mismo el codigo 4' />
                    </Carrousel>
                </div>
            </div>
        </>
    )
}