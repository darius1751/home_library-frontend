import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../interfaces/nav-item.interface';
import styles from './navbar.module.css';

type Props = {
    navItems: NavItem[];
}
export const Navbar = ({ navItems }: Props) => {
    return (
        <nav className={styles.navbar}>
            <Logo />
            <ul className={styles.navbarItems}>
                {
                    navItems.map(({ text, to }, index) => (
                        <li key={`navbar-${index}`}>
                            <NavLink to={to} className={styles.navbarItem}>{text}</NavLink>
                        </li>
                    )
                    )
                }
            </ul>
        </nav>
    )
}