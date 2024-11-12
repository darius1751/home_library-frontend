import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { PublicLayout } from "./Layouts/PublicLayout";
import { HomePage } from "./pages/Home/HomePage";
import { RootLayout } from "./Layouts/RootLayout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Context } from "./context/Context";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import './App.css';
import { Logout } from "./pages/Logout";
import CreateBook from "./pages/CreateBook/CreateBook";
import { PrivateLayout } from "./Layouts/PrivateLayout";
import ShowBooks from "./pages/ShowBooks/ShowBooks";
const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />}>
        <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateLayout />}>
            <Route path="/addBook" element={<CreateBook />} />
            <Route path="/books/:id" element={<ShowBooks />} />
        </Route>
        <Route element={<DashboardLayout />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path="dashboard/logout" element={<Logout/>}/>
        </Route>
    </Route>
));

export const App = () => {
    return (
        <Context>
            <RouterProvider router={router} />
        </Context>
    )
}