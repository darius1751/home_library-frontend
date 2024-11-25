import styles from './carrousel.module.css';
type Props = {
    children: React.ReactNode[];
}
export const Carrousel = ({ children }: Props) => {
    return (
        <div className={styles.carousel}>

            <div className={styles.items}>
                {
                    children.map(
                        (child, index) => <div className={`${styles.item}`} key={`carrousel-item-${index}`}>{child}</div>
                    )
                }
            </div>

        </div>

    )
}