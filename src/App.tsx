import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { PublicLayout } from "./Layouts/PublicLayout";
import { HomePage } from "./pages/Home/HomePage";
import { RootLayout } from "./Layouts/RootLayout";
import { Login } from "./pages/Login/Login";
import { Register } from "./pages/Register/Register";
import { Context } from "./context/Context";
import { DashboardLayout } from "./Layouts/DashboardLayout";
import { Logout } from "./pages/Logout";
import CreateBook from "./pages/CreateBook/CreateBook";
import ShowBooks from "./pages/ShowBooks/ShowBooks";
import BookDetail from "./pages/BookDetail/BookDetail";
import UpdateBook from "./pages/UpdateBook/UpdateBook";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";
import './App.css';
const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />}>
        <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword/>}/>
        </Route>
        <Route element={<DashboardLayout />} path="/dashboard">
            <Route path='' element={<Navigate to={'books'} />} />
            <Route path="books" element={<ShowBooks />} />
            <Route path="add-book" element={<CreateBook />} />
            <Route path="books/detail/:id" element={<BookDetail />} />
            <Route path="update/:id" element={<UpdateBook />} />
            <Route path="logout" element={<Logout />} />
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