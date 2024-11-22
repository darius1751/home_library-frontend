import { User } from '../../../interfaces';
import { SideBarItem as SideBarItemModel } from '../../../interfaces/sidebarItem';
import styles from '../sideBar.module.css';
import { SideBarItem } from './SidebarItem';
import { defaultAvatar } from '../../../pages/Register/Register';
type Props = {
    sidebarItems: SideBarItemModel[];
    user: Partial<User>
}
export const SideBarOpen = ({ user, sidebarItems }: Props) => {
    const { avatar, name, username } = user;
    return (
        <div className={styles.sideBarContent}>
            <div className={styles.userInfo}>
                <span className={styles.avatarContorn}>
                    <img src={avatar || defaultAvatar} alt={avatar} className={styles.avatar} />
                </span>
                <span className={styles.name}>{name}</span>
                <small className={styles.username}>{username}</small>
            </div>
            <div className={styles.sidebarItems}>
                {
                    sidebarItems.map(
                        (sidebarItem, index) => (
                            <SideBarItem key={`sidebarItem-${index}`} sidebarItem={sidebarItem} />
                        )
                    )
                }
            </div>
        </div>
    )
}