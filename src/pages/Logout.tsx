import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react";
import { UserContext } from "../context/contexts";


export const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleLogout = async () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/login');
    }
    useEffect(() => {
        handleLogout();
    }, [])
    return (
        <></>
    )
}