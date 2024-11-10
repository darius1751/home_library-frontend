import { Credential } from "./credential";

export interface CreateUserDto {
    name: string;
    email: string;
    birthday: string;
    credential: Credential;
}