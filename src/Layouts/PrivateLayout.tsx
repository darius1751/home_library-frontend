import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces/nav-item"
import { Footer } from "../components/Footer/Footer"
import { useContext } from "react"
import { UserContext } from "../context/contexts"



export const PrivateLayout = () => {
    const {user} = useContext(UserContext);

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
        <Navbar navItems={navItems} />
            <Outlet />
            <Footer navItems={navItems} />
        </>
    )
}