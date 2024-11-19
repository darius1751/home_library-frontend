import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces"
import { useContext } from "react"
import { UserContext } from "../context/contexts"

export const DashboardLayout = () => {
    const { user } = useContext(UserContext);
    const navItems: NavItem[] = [
        {
            text: 'My Books',
            to: `/dashboard/books`
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
                user._id ? (
                    <>
                        <Navbar navItems={navItems} home="/dashboard" />
                        <Outlet />
                    </>
                )
                    : <Navigate to="/login"/>
            }
        </>
    )
}