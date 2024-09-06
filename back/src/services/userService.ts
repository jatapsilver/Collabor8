import ICreateUserDto from "../dto/ICreateUserDto";
import { Credential } from "../entities/Credential";
import { User } from "../entities/User";
import { CredentialRepository, UserRepository } from "../repositories/indexRepository";
import { CreateCredentialService } from "./CredentialsServices";

export const getAllUserServices = async (): Promise<User[]> =>{
    const allUsers: User[] = await UserRepository.find({
        relations:{
            appointments: true
        }
    });
    return allUsers;
} 

export const getUserByIdServices = async (id: number): Promise<User | undefined > => {
    const user = await UserRepository.findOne({
        where: {id},
        relations: ["appointments"]
    });
    if(!user) throw new Error ("Usuario no existe");
    return user;
}

export const createUserServices = async (createUserDto: ICreateUserDto ): Promise <User> => {

    const {name, email, birthdate, nDni, username, password} = createUserDto;

    const fonudUserEmail: User | null = await UserRepository.findOneBy({email});
    if(fonudUserEmail) throw new Error ("El email ya se encuentra registrado"); 
    const fonudUserName: Credential | null = await CredentialRepository.findOneBy({username});
    if(fonudUserName) throw new Error ("El username ya se encuentra en uso"); 
    
    

    const newCredential: Credential = await CreateCredentialService({username, password});
    const newCreateUserDto = {name, email, birthdate, nDni, credential: newCredential}
    const newUser = await UserRepository.create(newCreateUserDto)
    const result = await UserRepository.save(newUser)
        
    return result;

}

export const findUserByCredentialIdSercice = async (credentialId: number) => {
    const user = await UserRepository.findOne({
        where: {
            credential: {id: credentialId}
        },
    })
    if(!user) throw new Error ("Usuario no encontrado")
    return user;
}