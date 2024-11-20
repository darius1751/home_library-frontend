import styles from '../sideBar.module.css';

export const ToogleSidebar = () => {
    return (
        <div className={styles.toogleSidebar}>
            <input type="checkbox" className={`${styles.menuInput}`} />
            <div className={styles.menu}></div>
        </div>
    )
}