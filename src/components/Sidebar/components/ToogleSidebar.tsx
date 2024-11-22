import styles from '../sideBar.module.css';
type Props = {
    sideBarState: boolean;
    setSideBarState: React.Dispatch<boolean>
}
export const ToogleSidebar = ({ sideBarState, setSideBarState }: Props) => {
    return (
        <div className={styles.toogleSidebar}>
            <input type="checkbox" className={`${styles.menuInput}`} checked={sideBarState} onChange={() => { setSideBarState(!sideBarState) }} />
            <div className={styles.menu}></div>
        </div>
    )
}