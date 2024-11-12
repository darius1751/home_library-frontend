import { useContext } from "react"
import { UserContext } from "../../context/contexts"


export const Dashboard = () => {
    const { user } = useContext(UserContext);
    const { name } = user;
    console.log(user)
    return (
        <div className="dashboard_page">
            <h1>Bienvenido: {name}</h1>
        </div>
    )
}