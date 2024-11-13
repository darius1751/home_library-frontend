import styles from '../Navbar/navbar.module.css';
export const MenuBurger = () => {
    return (
        <div>
            <input type="checkbox" className={styles.menuInput}/>
            <div className={styles.menu}></div>
        </div>
    )
}