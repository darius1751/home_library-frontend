import { NavLink } from 'react-router-dom';
import styles from './footer.module.css';
import { Logo } from '../Logo/Logo';
type Props = {
    className?: string;
}
export const Footer = ({ className = "" }: Props) => {
    const year = new Date().getFullYear()
    return (
        <footer className={`${styles.footer} ${className}`}>
            <Logo to='/' className={styles.logo} />
            <NavLink to="/" className={styles.title}>Home Library</NavLink>
            <NavLink to={'tel://+56979298644'} className={styles.phone}>
                Phone: <span className={styles.detail}>+56979298644</span>
            </NavLink>
            <p className={styles.email}>homeLibrary@email.com</p>
            <small className={styles.copyright}>copyright©{year}</small>
        </footer>
    )
}