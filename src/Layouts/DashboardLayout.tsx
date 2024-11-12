import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces"
import { useContext } from "react"
import { UserContext } from "../context/contexts"

export const DashboardLayout = () => {
    const { user } = useContext(UserContext);
    const { _id } = user;
    const navItems: NavItem[] = [
        {
            text: 'Home',
            to: '/'
        },
        {
            text: 'Logout',
            to: '/logout'
        },
        {
            text: 'My Books',
            to: `/books/${user._id}`
        },
        {
            text: 'Add Book',
            to: '/addBook'
        }
    ]
    return (
        <>
            {
                _id ? (
                    <>
                        <Navbar navItems={navItems} />
                        <Outlet />
                    </>) : <Navigate to='/' />

            }
        </>
    )
}