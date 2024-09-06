import ICreateScheduleAppointmentDto from "../dto/ICreateScheduleAppointmentDto";
import { Appointment } from "../entities/Appointment";
import IAppointment, { AppointmentStatus } from "../interfaces/IAppointment";
import { AppointmentRepository, UserRepository } from "../repositories/indexRepository";

export const getAllAppointmentsServices = async (): Promise <Appointment[]> => {
    const allAppointments: Appointment [] = await AppointmentRepository.find({
        relations:{
            user: true
        }
    });
    return allAppointments;
}

export const getAppointmentsByIdServices = async (appointmenId: number): Promise<Appointment> => {

    const appointment: Appointment | null = await AppointmentRepository.findOneBy({
        id: appointmenId,
    })
    if (!appointment) throw new Error ("El turno no existe");
    return appointment;
}

export const createScheduleAppointmentServices = async (createScheduleAppointmentDto: ICreateScheduleAppointmentDto): Promise <Appointment> =>{

    const {date, time, userId, description} = createScheduleAppointmentDto
    const user = await UserRepository.findOneBy ({id: userId});
    if (!user) throw new Error ("El usuario no existe");
    const newAppointment: Appointment = await AppointmentRepository.create({
        date, time, description
    });
    newAppointment.user=user;
    const result = await AppointmentRepository.save(newAppointment);
    return result;
}


export const cancelAppointmentServices = async (appointmentId: number): Promise<void> => {

    const appointment: Appointment | null = await AppointmentRepository.findOneBy({id: appointmentId});  
    if (!appointment) throw new Error ("El turno no existe");
    appointment.status = AppointmentStatus.CANCELLED;
    await AppointmentRepository.save(appointment);
    return;
}


