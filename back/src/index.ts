import { DB_PORT, PORT } from "./config/envs";
import app from "./server";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";
import { preloadUserData, preloadDataAppointment } from "./helpers/preloadData";




const initializeApp = async () => {
try {
    await AppDataSource.initialize()
        console.log(`Conexion a la base de datos realizada con exito en el puerto ${DB_PORT}`);
        await preloadUserData();
        await preloadDataAppointment();
        app.listen(PORT || 8080, () =>{
            console.log(`El servidor esta corriendo en el http://localhost:${PORT}`);
        })
} catch (error) {
    console.log("Error al inicializar el servidor:", error);
}
}

initializeApp()









