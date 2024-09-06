import { useEffect, useState } from "react";
import CardAppointment from "../../components/cardAppointment/CardAppointment";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAppointments } from "../../redux/userSlice";



const GETUSERBYID_URL = "http://localhost:3000/users/"
const CANCEL_URL = "http://localhost:3000/appointment/cancel/appointmets/"

const Appoitments = () => {
    // const [appointments, setAppointments] = useState([]);

    const login = useSelector((state) => state.actualUser.userData.login)
    const navigate = useNavigate(); 

    useEffect(() => {
        !login && navigate ("/");
    }, [login])


    const actualUserId = useSelector((state) => state.actualUser.userData.user.id);
    const dispatch = useDispatch();
    const appointments = useSelector((state) => state.actualUser.userAppointments);
    useEffect (() => {
        axios.get(GETUSERBYID_URL + actualUserId )
           .then ((response) => response.data)
           .then ((actualUser) => dispatch ((setUserAppointments(actualUser.appointments))))
           .catch((error) => console.log(error.message));
        }, [actualUserId, dispatch]);
    

    const handleAppointmentCancel = (appointmentId) => {
        axios
        .put(CANCEL_URL + appointmentId)
        .then ((response) => response.data)
        .then((data) => {
            axios
            .get(GETUSERBYID_URL + actualUserId)
           .then ((response) => response.data)
           .then ((actualUser) => dispatch (setUserAppointments(actualUser.appointments)))
           .catch((error) => console.log(error.message));
            })
        .catch(error => `Error al cancelar: ${error.response.data.message}`);
    };

    return (
        <div >
            <h1>Mis reservas</h1>
                    {appointments.length
                    ? appointments.map((appointments) =>(
                    <CardAppointment
                        key={appointments.id}
                        id={appointments.id}
                        date={appointments.date}
                        time={appointments.time}
                        status={appointments.status}
                        description={appointments.description}
                        handleAppointmentCancel={handleAppointmentCancel}
                    />
                ))
                : <p>Auno no tienes Turnos Reservados</p>
            }
        </div>
    )
}

export default Appoitments;