import { Navigate, Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces"
import { useContext } from "react"
import { UserContext } from "../context/contexts"
const navItems: NavItem[] = [
    {
        to: '/dashboard/wishlist',
        text: 'Wishlist'
    },
    {
        to: '/dashboard/search',
        text: 'Search'
    },
    {
        to: '/dashboard/bookList',
        text: 'BookList'
    },
    {
        to: '/dashboard/logout',
        text: 'Logout'
    }
]
export const DashboardLayout = () => {
    const { user } = useContext(UserContext);
    const { _id } = user;
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