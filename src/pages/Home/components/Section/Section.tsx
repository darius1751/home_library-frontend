import styles from './section.module.css';
type Props = {
    src: string,
    alt: string
    className?: string;
    description: string;
}
export const Section = ({ src, alt, className = '', description }: Props) => {
    return (
        <div className={styles.section}>
            <img src={src} alt={alt} className={`${className} ${styles.image}`} />
            <p className={styles.description}>{description}</p>
        </div>
    )
}
