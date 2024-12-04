import { NavLink } from 'react-router-dom';
import styles from './footer.module.css';
import { Logo } from '../Logo/Logo';
type Props = {
    className?: string;
    navItems?: { to: string; text: string }[];
}
export const Footer = ({ className = "" }: Props) => {
    const year = new Date().getFullYear();
    const email = "homelibrary.enterprise@gmail.com";
    const phone = "+56979298644";
    return (
        <footer className={`${styles.footer} ${className}`}>
            <Logo to='/' className={styles.logo} />
            <NavLink to="/" className={styles.title}>Home Library</NavLink>
            <NavLink to={`tel://${phone}`} className={styles.phone}>
                Phone: <span className={styles.detail}>{phone}</span>
            </NavLink>
            <NavLink to={`mailto:${email}?Subject=Mas Informacion sobre *HomeLibrary*`} className={styles.email}>
                {email}
            </NavLink>
            <small className={styles.copyright}>copyright©{year}</small>
        </footer>
    )
}