import { Request, Response } from "express"
import { cancelAppointmentServices, createScheduleAppointmentServices, getAllAppointmentsServices, getAppointmentsByIdServices } from "../services/AppointmentServices";
import ICreateScheduleAppointmentDto from "../dto/ICreateScheduleAppointmentDto";
import { Appointment } from "../entities/Appointment";


export const getAllAppointments = async (req: Request, res: Response) => {
        
        try {
                const allAppointments: Appointment[] = await getAllAppointmentsServices();
                res.status(200).json(allAppointments);
        } catch (error: any) {
                res.status(404).json({ message: error.message});
        }
    }

export const getAppointmentsById = async (req: Request<{id: string}>, res: Response) => {
        
        const id = Number(req.params.id);
        try {
                const appointment: Appointment = await getAppointmentsByIdServices(id)
                res.status(201).json(appointment);
        } catch (error: any) {
                res.status(400).json({ message: error.message});
        }
    }


    
export const schedule = async (req: Request <{}, {}, ICreateScheduleAppointmentDto>, res: Response) => {

        const { date, time, userId, description} = req.body
        try {
                const newAppointment = await createScheduleAppointmentServices({date, time, userId, description});
                res.status(201).json(newAppointment);
        } catch (error: any) {
                res.status(400).json({ message: error.message});       
        }
}    

export const cancel = async (req: Request <{id: string}>, res: Response) => {

        const id = Number(req.params.id);
        
        try {
                await cancelAppointmentServices(id);
                res.status(200).json({ message: "Turno cancelado"});
        } catch (error: any) {
                res.status(404).json({message: error.message});
        }
}    


  