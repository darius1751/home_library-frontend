import styles from './section.module.css';
type Props = {
    src: string,
    title: string;
    alt: string
    description: string;
    className?: string;
}
export const Section = ({ src, alt, title, description, className = '', }: Props) => {
    return (
        <div className={styles.section}>
            <div className={styles.imageContainer}>
                <img src={src} alt={alt} className={`${className} ${styles.image}`} loading='lazy'/>
            </div>
            <div className={styles.content}>
                <span className={styles.title}>{title}</span>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    )
}
