import { SideBarItem as SideBarItemModel } from '../../../interfaces/sidebarItem';
import { SideBarItem } from './SidebarItem';
import styles from '../sideBar.module.css';
type Props = {
    sidebarItems: SideBarItemModel[];
}
export const SideBarResumen = ({ sidebarItems }: Props) => {
    return (
        <div className={styles.sideBarResumen}>
            <div className={styles.sidebarItems}>
                {
                    sidebarItems.map(
                        (sidebarItem, index) => (
                            <SideBarItem key={`sidebarItem-${index}`} sidebarItem={sidebarItem} type='resumen'/>
                        )
                    )
                }
            </div>
        </div>
    )
}