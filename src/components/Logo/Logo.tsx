import { NavLink } from 'react-router-dom';
import styles from './logo.module.css';
export const Logo = () => {
    return (
        <NavLink to={'/'} className={styles.logo} />
    )
}