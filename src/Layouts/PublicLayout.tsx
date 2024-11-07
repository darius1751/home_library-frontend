import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces/nav-item.interface"
import { Footer } from "../components/Footer/Footer"

const navItems: NavItem[] = [
    {
        text: 'Sign In',
        to: '/sign-in'
    },
    {
        text: 'Login',
        to: '/login'
    }
]
export const PublicLayout = () => {

    return (
        <>
            <Navbar navItems={navItems} />
            <Outlet />
            <Footer navItems={navItems} />
        </>
    )
}