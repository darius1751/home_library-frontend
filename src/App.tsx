import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { PublicLayout } from "./Layouts/PublicLayout";
import { HomePage } from "./pages/Home/HomePage";
import { RootLayout } from "./Layouts/RootLayout";
import './App.css';
const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<RootLayout />}>
        <Route path="" element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} index />
            <Route path="/login" element={<>Login</>}/>
        </Route>
    </Route>
));

export const App = () => {
    return (
        <RouterProvider router={router} />
    )
}