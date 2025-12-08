import styles from './hero.module.css';
import heroImage from '/src/assets/images/hero.png';

export const Hero = () => {
    return (
        <div className={styles.hero}>
            <img src={heroImage} alt="hero" className={styles.image} />
            <p className={`${styles.content} playwrite-au-sa `}>
                Home Library, your reliable app, where you can keep your library up to date
            </p>
        </div>
    )
}