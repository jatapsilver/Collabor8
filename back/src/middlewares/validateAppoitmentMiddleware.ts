import { Request, Response, NextFunction } from 'express';


const isValidDate = (dateStr: string): boolean => {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // yyyy-mm-dd
    return regex.test(dateStr);
};


const isValidTime = (timeStr: string): boolean => {
    const regex = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/; // hh:mm
    return regex.test(timeStr);
};




export const validateAppointmentMiddleware = (req: Request<{}, {}, { date: string, time: string, userId: number, description: string }>, res: Response, next: NextFunction) => {
    const { date, time, userId, description } = req.body;

    try {
 
        if (!date || !time || userId === undefined || !description) {
            return res.status(400).json({ message: "Todos los campos (date, time, userId, description) son obligatorios" });
        }


        if (!isValidDate(date)) {
            return res.status(400).json({ message: "La fecha debe estar en el formato yyyy-mm-dd" });
        }
        const appointmentDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ajustar la hora del día a 00:00:00 para la comparación
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const twoWeeksLater = new Date(today);
        twoWeeksLater.setDate(today.getDate() + 14);

        if (appointmentDate < tomorrow || appointmentDate > twoWeeksLater) {
            return res.status(400).json({ message: "La fecha debe estar entre el día siguiente y 14 días a partir de hoy" });
        }

        if (!isValidTime(time)) {
            return res.status(400).json({ message: "La hora debe estar en el formato hh:mm" });
        }
        const [hours, minutes] = time.split(':').map(Number);
        if (hours < 9 || hours > 17 || (hours === 17 && minutes > 0)) {
            return res.status(400).json({ message: "La hora debe estar entre las 09:00 y las 17:00 en intervalos de media hora" });
        }
        if (minutes !== 0 && minutes !== 30) {
            return res.status(400).json({ message: "La hora debe estar en intervalos de media hora, por ejemplo, 12:30" });
        }

        if (typeof userId !== 'number' || isNaN(userId)) {
            return res.status(400).json({ message: "El userId debe ser un número" });
        }


        if (!description || description.trim() === '') {
            return res.status(400).json({ message: "La descripción no puede estar vacía" });
        }

        next();
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
