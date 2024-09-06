export enum AppointmentStatus{
    ACTIVE = "active",
    CANCELLED = "cancelled",
}

interface IAppointment{
    
    date: string; 
    time: string; 
    userId: number; 
    status: AppointmentStatus
    description: string;
}

export default IAppointment;