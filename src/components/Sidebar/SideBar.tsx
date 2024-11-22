import { useContext } from 'react';
import { UserContext } from '../../context/contexts';
import { SideBarItem as SideBarItemModel } from '../../interfaces/sidebarItem';
import { SideBarItem } from './components/SidebarItem';
import { ToogleSidebar } from './components/ToogleSidebar';
import styles from './sideBar.module.css';
import { defaultAvatar } from '../../pages/Register/Register';
type Props = {
    sidebarItems: SideBarItemModel[];
}
export const SideBar = ({ sidebarItems }: Props) => {
    const { user } = useContext(UserContext);
    const { avatar, name, username } = user;
    console.log({ user });
    return (
        <div className={styles.sideBar}>
            <ToogleSidebar />
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
        </div>
    )
}