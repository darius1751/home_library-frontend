import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { NavItem } from "../interfaces/nav-item"


export const navItems: NavItem[] = [
    {
        text: 'Login',
        to: '/login'
    },
    {
        text: 'Register',
        to: '/register'
    },
]
export const PublicLayout = () => {

    return (
        <>
            <Navbar navItems={navItems} />
            <div className="public_page">
                <Outlet />
            </div>

        </>
    )
}