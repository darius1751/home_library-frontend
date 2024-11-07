import { Outlet } from "react-router-dom"
import { ToogleTheme } from "../components/ToogleTheme/ToogleTheme"

export const RootLayout = () => {
    return (
        <>
            <Outlet />
            <ToogleTheme />
        </>
    )
}