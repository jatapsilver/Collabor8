import styles from "./CardAppointment.module.css"
const CANCEL_URL = "http://localhost:3000/appointment/cancel/appointmets/"


const CardAppointment = ({id, date, time, status, description, handleAppointmentCancel}) => {

    const handleClick = () => {
        if(
            window.confirm(
                `Deseas cancelar el turno del dia ${date} a las ${time}hs`
            )
        ) {
            handleAppointmentCancel(id);
        }
    };

      return(
        <div className={styles.container}>
            <span>{date}</span>
            <span>{time}</span>
            <span>{description}</span>
            {
                status === "active"
                ? (<span className={styles.active}  >Activo</span>)
                : (<span className={styles.cancelled}>Cancelado</span>) 
            }
            <button onClick={handleClick}>Cancelar</button>
        </div>
    )
}

export default CardAppointment;