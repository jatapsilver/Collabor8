import React from "react";
import styles from "./Contact.module.css"

const Contact = () => {
    return(
        <div>
            <div className={styles.containerFondo} >
                <div className={styles.containerPrincipal}>
                <h1>Javier Alexander Plata Rueda</h1>
                <p>"¡Hola! Soy Javier Alexander Plata Rueda, apasionado por el desarrollo web, la tecnología y la blockchain Si tienes alguna pregunta, estás buscando colaboración o simplemente quieres charlar sobre ideas y proyectos, no dudes en contactarme. Estoy siempre dispuesto a escuchar y aportar soluciones."</p>
                
                    <div className={styles.containerImagenes}>
                        <a href="https://www.linkedin.com/in/javier-alexander-plata-rueda-127894244/">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" target="_blank" />
                        </a>
                        <a href="https://github.com/jatapsilver">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Github-desktop-logo-symbol.svg/2048px-Github-desktop-logo-symbol.svg.png" target="_blank" />
                        </a>
                        <a href="https://www.instagram.com/jatapsilver/">
                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" target="blank" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;