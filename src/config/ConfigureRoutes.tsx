import { RouterProvider } from "react-router-dom"
import { router } from "../constants/router"

export const ConfigureRoutes = () => { 
    return (
        <RouterProvider router={router}/>
    )
}