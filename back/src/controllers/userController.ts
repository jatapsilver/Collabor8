import { Request, Response } from "express"
import { createUserServices, findUserByCredentialIdSercice, getAllUserServices, getUserByIdServices } from "../services/userService";
import ICreateUserDto from "../dto/ICreateUserDto";
import ICreateCredentialDto from "../dto/ICreateCredentialDto";
import { validateCredentialsService } from "../services/CredentialsServices";
import { User } from "../entities/User";



export const getALLusers = async (req: Request, res: Response) => {

    try {
        const allUsers: User[] = await getAllUserServices();
        res.status(200).json(allUsers);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


export const getUserById = async (req: Request<{id: string} >, res: Response) => {
    
    try {
        const id = Number(req.params.id);
        const user: User | undefined = await getUserByIdServices(id)
        res.status(201).json(user);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}



export const register = async (req: Request<{}, {}, ICreateUserDto>, res: Response) => {
    
    try {
        const {name, email, birthdate, nDni, username, password} = req.body;
        const newUser: User = await createUserServices({
            name, email, birthdate, nDni, username, password,
        });
        res.status(200).json({ message: "Usuario Registrado con exito" });
        
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }

    
}

export const login = async (req: Request <{},{},ICreateCredentialDto>, res: Response) => {
    try {
        const {username, password} = req.body;
        const credentialId = await validateCredentialsService ({username, password});
        const user = await findUserByCredentialIdSercice(credentialId);
        res.status(200).json({ login: true, user });

    } catch (error: any) {
        res.status(400).json({ message: "Credenciales Incorrectas"});
    }
}

