import { Credential } from "./credential";

export interface CreateUserDto {
    avatar: string;
    name: string;
    email: string;
    birthday: string;
    credential?: Credential;
    password?: string;
}