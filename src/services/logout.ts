import { api } from "../config/api"

export const logout = async () => {
    const { status, data } = await api.put('/auth/logout');
    return { status, data }
}