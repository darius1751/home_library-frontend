import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";


export const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/" element={<h1>Initial Page in constants/router</h1>} />
    </>
));