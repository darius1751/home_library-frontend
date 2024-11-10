import { createContext } from 'react'
import { User } from '../interfaces'
export type userContext = {
    user: Partial<User>,
    setUser: React.Dispatch<Partial<User>>
}
export const UserContext = createContext<userContext>({ user: {}, setUser: () => { } });
