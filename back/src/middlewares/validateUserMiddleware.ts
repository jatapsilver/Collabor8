import { Request, Response, NextFunction } from "express";
import ICreateUserDto from "../dto/ICreateUserDto";

export const validateUserMiddleware = (req: Request<{}, {}, ICreateUserDto>, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, username, password } = req.body;

    try {
        if (!name || !email || !birthdate || !nDni === undefined || !username || !password) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const namePattern = /^[A-Za-z\s]{3,20}$/; 
        if (!namePattern.test(name)) {
            return res.status(400).json({ message: "El nombre debe contener solo letras y tener entre 3 y 20 caracteres" });
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: "El email no es válido" });
        }


        const birthdatePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!birthdatePattern.test(birthdate)) {
            return res.status(400).json({ message: "La fecha de nacimiento debe estar en el formato YYYY-MM-DD" });
        }

        const [year, month, day] = birthdate.split('-').map(Number);
        const birthdateObj = new Date(year, month - 1, day);
        

        if (birthdateObj.getFullYear() !== year || birthdateObj.getMonth() !== month - 1 || birthdateObj.getDate() !== day) {
            return res.status(400).json({ message: "La fecha de nacimiento no es válida" });
        }


        const today = new Date();
        if (birthdateObj > today) {
            return res.status(400).json({ message: "La fecha de nacimiento no puede estar en el futuro" });
        }


        let age = today.getFullYear() - birthdateObj.getFullYear();
        const monthDifference = today.getMonth() - birthdateObj.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdateObj.getDate())) {
            age--;
        }

        if (age < 18) {
            return res.status(400).json({ message: "Debes tener al menos 18 años" });
        }

        const nDniNumber = Number(nDni);
        if (typeof nDniNumber !== 'number' || nDniNumber <= 0 || nDniNumber > 99999999999999) { 
            return res.status(400).json({ message: "El DNI debe ser un número positivo y no exceder los 14 dígitos" });
        }


        if (username.length < 4 || username.length > 25) {
            return res.status(400).json({ message: "El nombre de usuario debe tener entre 4 y 25 caracteres" });
        }


        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                message: "La contraseña debe tener al menos 8 caracteres, incluir al menos un número, una letra mayúscula, una letra minúscula y un carácter especial."
            });
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }

    next();
};
