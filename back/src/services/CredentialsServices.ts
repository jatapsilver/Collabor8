
import ICreateCredentialDto from "../dto/ICreateCredentialDto";
import { Credential } from "../entities/Credential";
import { CredentialRepository, UserRepository } from "../repositories/indexRepository";



export const CreateCredentialService = async (createCredentialDto: ICreateCredentialDto) : Promise<Credential>=> {

    const newCredential = await CredentialRepository.create(createCredentialDto)
    const result = await CredentialRepository.save(newCredential);
    return result;
}


export const validateCredentialsService = async (validateCredentalDto: ICreateCredentialDto): Promise<number> => {

   
    const { username, password } = validateCredentalDto;
    const foundCredential = await CredentialRepository.findOne({
        where: {username}});
        if(!foundCredential) throw new Error ("Credenciales Incorrectas");
    if(foundCredential.password !== password) throw new Error ("Credenciales Incorrectas");
    return foundCredential.id;
    
}


