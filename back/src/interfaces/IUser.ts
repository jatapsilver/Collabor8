import { Credential } from "../entities/Credential";

interface IUser {

    name: string;
    email: string;
    birthdate: string;
    nDni: number;
    credentials: Credential;
}

export default IUser