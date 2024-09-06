import { AppDataSource } from "../config/data-source"
import { Appointment } from "../entities/Appointment"
import { Credential } from "../entities/Credential"
import { User } from "../entities/User"


export const UserRepository = AppDataSource.getRepository(User)
export const CredentialRepository = AppDataSource.getRepository(Credential)
export const AppointmentRepository = AppDataSource.getRepository(Appointment)
