import styles from './slider.module.css';
type Props = {
    children: React.ReactNode[];
}
export const Slider = ({ children }: Props) => {
    return (
        <div className={styles.slider}>
            <div className={styles.slides}>
                {
                    children.map((child, index) => (<div className={styles.slide} key={`slide-${index}`}>{child}</div>))
                }
            </div>
        </div>
    )
}