import { Navigate, Outlet } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/contexts"
import { SideBar } from "../components/Sidebar/SideBar"
import { SideBarItem } from "../interfaces/sidebarItem"
import home from '../assets/icons/home.svg';
import addBook from '../assets/icons/addBook.svg';
import logout from '../assets/icons/logout.svg';
const sidebarItems: SideBarItem[] = [
    {
        text: 'My Books',
        to: `/dashboard/books`,
        description: 'Show your books',
        icon: home
    },
    {
        text: 'Add Book',
        to: '/dashboard/add-book',
        description: '',
        icon: addBook
    },
    {
        text: 'Logout',
        to: '/dashboard/logout',
        description: "",
        icon: logout
    },
]
export const DashboardLayout = () => {
    const { user } = useContext(UserContext);

    return (
        <>
            {
                user._id ? (
                    <>
                        <SideBar sidebarItems={sidebarItems} />
                        <Outlet />
                    </>
                )
                    : <Navigate to="/login" />
            }
        </>
    )
}