import { useState } from "react";
import { UserContext } from './contexts';
import { User } from "../interfaces";
type Props = {
    children: React.ReactNode
}
export const Context = ({ children }: Props) => {
    const [user, setUser] = useState<Partial<User>>({});

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider >
    )
}