import { useNavigate } from "react-router-dom"
import { logout } from "../services/logout";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/contexts";


export const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleLogout = async () => {
        await logout();
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