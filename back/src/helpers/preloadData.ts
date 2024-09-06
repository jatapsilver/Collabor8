import { AppDataSource } from "../config/data-source";
import { AppointmentStatus } from "../interfaces/IAppointment";
import ICredential from "../interfaces/ICredential";
import IUser from "../interfaces/IUser";
import { AppointmentRepository, UserRepository, CredentialRepository } from "../repositories/indexRepository";

const preloadUsers = [
    {
        user: {
            name: "Javier Plata",
            email: "javier.plata@gmail.com",
            birthdate: "1992-02-05",
            nDni: 12345678,
        } as IUser,
        credential: {
            username: "javier.plata",
            password: "password",
        } as ICredential,
    },
    {
        user: {
            name: "Carolina Romero",
            email: "carolina.romero@gmail.com",
            birthdate: "1994-05-06",
            nDni: 87654321, 
        } as IUser,
        credential: {
            username: "carolina.romero",
            password: "password",
        } as ICredential,
    },
    {
        user: {
            name: "Monica Rueda",
            email: "monica.rueda@gmail.com",
            birthdate: "1994-05-06",
            nDni: 23456789, 
        } as IUser,
        credential: {
            username: "monica.rueda",
            password: "password",
        } as ICredential,
    },
    {
        user: {
            name: "Christopher Plata",
            email: "christopher.plata@gmail.com",
            birthdate: "1994-05-06",
            nDni: 34567890, 
        } as IUser,
        credential: {
            username: "christopher.plata",
            password: "password",
        } as ICredential,
    },
];

const preloadAppointments = [
    {
        date: "2024-07-08",
        time: "10:00",
        userId: 2,
        status: AppointmentStatus.ACTIVE,
        description: "Estación Focus",
    },
    {
        date: "2024-07-08",
        time: "12:00",
        userId: 2,
        status: AppointmentStatus.CANCELLED,
        description: "Estación Inspira",
    },
    {
        date: "2024-07-08",
        time: "14:00",
        userId: 4,
        status: AppointmentStatus.ACTIVE,
        description: "Estación Colabora",
    },
    {
        date: "2024-07-08",
        time: "16:00",
        userId: 3,
        status: AppointmentStatus.ACTIVE,
        description: "Estación Colabora",
    },
];

export const preloadUserData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const users = await UserRepository.find();

        if (users.length) {
            return console.log("No se realizó la precarga de datos porque ya existen usuarios.");
        }

        for await (const { user, credential } of preloadUsers) {
            
            const newCredential = CredentialRepository.create(credential);
            const savedCredential = await transactionalEntityManager.save(newCredential);
            
            user.credentials = savedCredential;
            const newUser = UserRepository.create(user);
            await transactionalEntityManager.save(newUser);
        }
        console.log("Precarga de usuarios realizada con éxito");
    });
};

export const preloadDataAppointment = async () => {

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const appointments = await AppointmentRepository.find();

        if (appointments.length) {
            return console.log("No se realizó la precarga de turnos porque ya existen turnos.");
        }
    
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

        const promises = preloadAppointments.map( async (appointment) => {
            const newAppointment = await AppointmentRepository.create(appointment);
            await queryRunner.manager.save(newAppointment);
            const user = await UserRepository.findOneBy({ id: appointment.userId });
            if (!user) throw Error ("Usuario no existe")
            newAppointment.user = user;
            queryRunner.manager.save(newAppointment)
        })

    try {
        await queryRunner.startTransaction();
        await Promise.all(promises);
        console.log ("Precarga de turno realizada correctamente")
        await queryRunner.commitTransaction();
        
    } catch (error) {
        console.error("Error al realizar la precarga de turnos", error);
        await queryRunner.rollbackTransaction();
    } finally {
        console.log ("Ha finalizado el proceso de precarga de turnos")
        await queryRunner.release();
    }

});
};
