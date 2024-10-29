import { NavLink } from 'react-router-dom';
import { NavItem } from '../../interfaces/nav-item.interface';
import styles from './footer.module.css';
type Props = {
    navItems: NavItem[];
}
export const Footer = ({ navItems }: Props) => {
    const year = new Date().getFullYear()
    return (
        <footer className={styles.footer}>
            <h1 className={styles.title}>Home Libray</h1>
            <div className={styles.items}>
                {
                    navItems.map(({ text, to }, index) => (
                    <li key={`footer-${index}`}>
                        <NavLink to={to} className={styles.item}>{text}</NavLink>
                    </li>
                )
                )}
            </div>
            <p className={styles.email}>homeLibrary@email.com</p>
            <small className={styles.copyright}>copyright©{year}</small>
        </footer>
    )
}