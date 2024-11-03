import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { RootLayout } from "../Layouts/RootLayout";
import { HomePage } from "../pages/Home/HomePage";


export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="" element={<RootLayout />}>
            <Route path="/" element={<HomePage/>} index/>
        </Route>
    </>
));