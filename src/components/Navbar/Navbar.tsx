import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../interfaces/nav-item';
import styles from './navbar.module.css';
import { MenuBurger } from '../MenuBurger/MenuBurger';

type Props = {
    navItems: NavItem[];
    home?: string;
}
export const Navbar = ({ navItems, home }: Props) => {
    return (
        <nav className={styles.navbar}>
            <Logo to={home} />
            <MenuBurger />
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