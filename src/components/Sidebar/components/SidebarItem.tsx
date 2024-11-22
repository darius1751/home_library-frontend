import { NavLink } from 'react-router-dom';
import { SideBarItem as SideBarItemModel } from '../../../interfaces/sidebarItem';
import styles from '../sideBar.module.css';
type Props = {
    sidebarItem: SideBarItemModel;
}
export const SideBarItem = ({ sidebarItem }: Props) => {
    const { to, text, description, icon } = sidebarItem;
    return (
        <NavLink to={to} className={({ isActive }) => {
            let classNames = `${styles.sideBarItem}`;
            if (isActive)
                classNames += ` ${styles.active}`;
            if (to === '/dashboard/logout')
                classNames += ` ${styles.logout}`;
            return classNames;
        }} >
            <img src={icon} alt={text} className={styles.icon} />
            <div className={styles.details}>
                <span className={styles.text}>{text}</span>
                <small className={styles.description}>{description}</small>
            </div>
        </NavLink>
    )
}