import { useRef } from 'react';
import styles from './carrousel.module.css';
type Props = {
    children: React.ReactNode[];
}
export const Carrousel = ({ children }: Props) => {
    const $carrousel = useRef<HTMLDivElement>(null);
    return (
        <div className={styles.carrousel} ref={$carrousel}>
            {
                children.map(
                    (child, index) => <div className={`${styles.item}`} key={`carrousel-item-${index}`}>{child}</div>
                )
            }
        </div>

    )
}