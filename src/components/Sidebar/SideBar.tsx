import { useContext, useState } from 'react';
import { UserContext } from '../../context/contexts';
import { SideBarItem as SideBarItemModel } from '../../interfaces/sidebarItem';
import { ToogleSidebar } from './components/ToogleSidebar';
import { SideBarOpen } from './components/SidebarOpen';
import { SideBarResumen } from './components/SideBarResumen';
import styles from './sideBar.module.css';

type Props = {
    sidebarItems: SideBarItemModel[];
}
export const SideBar = ({ sidebarItems }: Props) => {
    const [sidebarState, setSideBarState] = useState(false);
    const { user } = useContext(UserContext);
    return (
        <div className={styles.sideBar}>
            <ToogleSidebar sideBarState={sidebarState} setSideBarState={setSideBarState} />
            {
                sidebarState ?
                    <SideBarOpen sidebarItems={sidebarItems} user={user} />
                    :
                    <SideBarResumen sidebarItems={sidebarItems} />
            }
        </div>
    )
}