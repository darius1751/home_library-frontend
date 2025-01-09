import styles from './hero.module.css';

export const Hero = () => {
    return (
        <div className={styles.hero}>
            <img src="/hero.png" alt="hero" className={styles.image} />
            <p className={`${styles.content} playwrite-au-sa `}>
                Home Library, your reliable app, where you can keep your library up to date
            </p>
        </div>
    )
}