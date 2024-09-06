import { Request, Response, NextFunction } from "express";

export const validateLoginMiddleware = (req: Request<{}, {}, { username: string, password: string }>, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    try {

        if (!username || !password) {
            return res.status(400).json({ message: "El nombre de usuario y la contraseña son obligatorios" });
        }


        next();
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
};
