import styles from './carrousel.module.css';
type Props = {
    children: React.ReactNode[];
}
export const Carrousel = ({ children }: Props) => {
    return (
        <div className={styles.slider}>

            <div className={styles.slideTrack}>
                {
                    children.map(
                        (child, index) => <div className={`${styles.slide}`} key={`carrousel-item-${index}`}>{child}</div>
                    )
                }
            </div>

        </div>

    )
}