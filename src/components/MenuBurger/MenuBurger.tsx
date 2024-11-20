import styles from '../Navbar/navbar.module.css';
type Props = {
    className?: string;
}
export const MenuBurger = ({ className = '' }: Props) => {
    return (
        <div>
            <input type="checkbox" className={`${styles.menuInput} ${className}`} />
            <div className={styles.menu}></div>
        </div>
    )
}