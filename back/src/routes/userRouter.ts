import { Router } from "express";
import { getALLusers, getUserById, login, register } from "../controllers/userController";
import { validateUserMiddleware } from "../middlewares/validateUserMiddleware";
import { validateLoginMiddleware } from "../middlewares/validateLoginUserMiddleware";

const userRouter = Router();

userRouter.get("/", getALLusers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", validateUserMiddleware, register);
userRouter.post("/login", validateLoginMiddleware, login);

export default userRouter;