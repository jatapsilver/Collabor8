import { Request, Response, Router } from "express"
import { cancel, getAllAppointments, getAppointmentsById, schedule } from "../controllers/appointmentController";
import { validateAppointmentMiddleware } from "../middlewares/validateAppoitmentMiddleware";

const appointmentsRouter = Router();

appointmentsRouter.get("/", getAllAppointments);
appointmentsRouter.get("/:id", getAppointmentsById);
appointmentsRouter.post("/schedule", validateAppointmentMiddleware, schedule);
appointmentsRouter.put("/cancel/appointmets/:id", cancel);

export default appointmentsRouter;
