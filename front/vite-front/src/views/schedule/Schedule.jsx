import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Schedule.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const POSTAPPOITMENT_URL = "http://localhost:3000/appointment/schedule/";

const Schedule = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.actualUser.userData.user.id);

    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [userId, navigate]);

    const initialState = {
        date: "",
        hours: "09",
        minutes: "00",
        description: "",
    };
    const [appointment, setAppointment] = useState(initialState);
    const [errors, setErrors] = useState({});

    const validateAppointment = ({ date, hours, minutes, description }) => {
        const errors = {};
        if (!date) errors.date = "Debe ingresar una fecha";
        else if (isWeekend(date))
            errors.date = "El día seleccionado es fin de semana";
        if (!description) errors.description = "Debe ingresar una descripción";
        else if (description.length < 5)
            errors.description = "La descripción debe tener al menos 5 caracteres";
        else if (description.length > 25)
            errors.description = "La descripción no puede superar los 25 caracteres";
        return errors;
    };

    const isWeekend = (date) => {
        const day = new Date(date).getDay();
        return day === 5 || day === 6; // Sábado y domingo
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAppointment((prevAppointment) => ({
            ...prevAppointment,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateAppointment(appointment);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const newAppointment = {
                date: appointment.date,
                time: `${appointment.hours}:${appointment.minutes}`,
                description: appointment.description,
                userId,
            };
            axios
                .post(POSTAPPOITMENT_URL, newAppointment)
                .then(({ data }) => {
                    alert(
                        `Ha sido creada la reserva: Fecha ${data.date}, hora ${data.time}`
                    );
                    setAppointment(initialState);
                    navigate("/turnos");
                })
                .catch((error) => {
                    alert(`Error: ${error.response.data.message}`);
                });
        }
    };

    const validHours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
    const validMinutes = ["00", "30"];

    const getTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.toISOString().split("T")[0];
    };

    const getFourteenDaysAhead = () => {
        const today = new Date();
        const fourteenDaysAhead = new Date(today);
        fourteenDaysAhead.setDate(today.getDate() + 13);
        return fourteenDaysAhead.toISOString().split("T")[0];
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.tittleH2}>Nueva Reserva</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Fecha: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={getTomorrow()}
                        max={getFourteenDaysAhead()}
                        value={appointment.date}
                        onChange={handleChange}
                    />
                    {errors.date && (
                        <span style={{ color: "red" }}>{errors.date}</span>
                    )}
                </div>

                <div>
                    <label htmlFor="time">Horario:</label>
                    <select
                        id="hours"
                        name="hours"
                        value={appointment.hours}
                        onChange={handleChange}
                    >
                        {validHours.map((hour) => (
                            <option key={hour} value={hour}>
                                {hour}
                            </option>
                        ))}
                    </select>
                    <select
                        id="minutes"
                        name="minutes"
                        value={appointment.minutes}
                        onChange={handleChange}
                    >
                        {validMinutes.map((minute) => (
                            <option key={minute} value={minute}>
                                {minute}
                            </option>
                        ))}
                    </select>
                </div>
                <br />

                <div>
                    <label htmlFor="description">Selecciona un espacio:</label>
                    <select
                        id="description"
                        name="description"
                        value={appointment.description}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una espacio</option>
                        <option value="Sala Horizonte">Sala Horizonte</option>
                        <option value="Sala Creativa">Sala Creativa</option>
                        <option value="Sala VIP">Sala VIP</option>
                        <option value="Oficina Punto de encuentro">Oficina punto de encuentro</option>
                        <option value="Estacion Focus">Estacion Focus</option>
                    </select>
                    {errors.description && (
                        <span style={{ color: "red" }}>
                            {errors.description}
                        </span>
                    )}
                </div>

                <button type="submit" disabled={Object.keys(errors).length > 0}>
                    Enviar
                </button>
            </form>
        </div>
    );
};

export default Schedule;
