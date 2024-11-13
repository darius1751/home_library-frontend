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
            text: 'My Books',
            to: `/dashboard/books/${user._id}`
        },
        {
            text: 'Add Book',
            to: '/dashboard/add-book'
        },
        {
            text: 'Logout',
            to: '/dashboard/logout'
        },
    ]
    return (
        <>
            {
                _id ? (
                    <>
                        <Navbar navItems={navItems} home="/dashboard" />
                        <Outlet />
                    </>) : <Navigate to='/' />

            }
        </>
    )
}