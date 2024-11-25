import { MouseEvent, useRef, useState } from 'react';
import styles from './slider.module.css';
type Props = {
    children: React.ReactNode[];
}
export const Slider = ({ children }: Props) => {
    const $slides = useRef<HTMLDivElement>(null);
    const [item, setItem] = useState(0);
    const { length } = children;
    const handleBack = (_e: MouseEvent<HTMLSpanElement>) => {
        if (item === 0) {
            $slides.current!.style.transform = `translateX(${-10 * length - 1}em)`
            setItem(length - 1)
        } else {
            $slides.current!.style.transform = `translateX(${10 * (item + 1)}em)`
            setItem(item - 1)
        }
    }
    const handleNext = (_e: MouseEvent<HTMLSpanElement>) => {
        if (item === length - 1) {
            $slides.current!.style.transform = 'translateX(0)'
            setItem(0);
        } else {
            $slides.current!.style.transform = `translateX(${-10 * (item + 1)}em)`
            setItem(item + 1)
        }
    }
    return (
        <div className={styles.slider}>
            <span className={styles.back} onClick={handleBack}></span>
            <span className={styles.slideView}>
                <div className={styles.slides} ref={$slides}>
                    {
                        children.map((child, index) => (<div className={styles.slide} key={`slide-${index}`}>{child}</div>))
                    }
                </div>
            </span>
            <span className={styles.next} onClick={handleNext}></span>
        </div>
    )
}