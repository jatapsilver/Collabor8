import React from "react";
import styles from "./About.module.css"

const About = () => {
    return(
        
        <div className={styles.containerFondo}>
        <div className={styles.containerPrincipal}>

                <section>
                    <div>
                        <h1 >Nuestra Historia</h1>
                        <p>Collabor8 nació de la idea de crear un entorno de trabajo donde los profesionales puedan conectarse, colaborar e inspirarse mutuamente. Fundado en <strong>2022</strong>, nuestro objetivo es ofrecer un espacio que fomente la creatividad y la productividad, adaptándose a las necesidades de cada individuo y equipo.</p>
                    </div>
                </section>

            
            
                <section >
                    <div >
                        <h1 >Nuestros Valores y Visión</h1>
                        <div >
                            <h2>Valores</h2>
                            <ul>
                                <li><strong>Colaboración:</strong> Fomentar un ambiente donde las ideas y habilidades se compartan y desarrollen en conjunto.</li>
                                <li><strong>Innovación:</strong> Proveer soluciones creativas y modernas para las necesidades profesionales.</li>
                                <li><strong>Flexibilidad:</strong> Adaptarse a las variadas necesidades de nuestros clientes.</li>
                                <li><strong>Compromiso:</strong> Brindar un servicio de alta calidad y mantener altos estándares de satisfacción.</li>
                            </ul>
                        </div>
                        <div >
                            <h2>Visión</h2>
                            <p>Convertirnos en el espacio de coworking más innovador y colaborativo, reconocidos por nuestra capacidad para inspirar y conectar a profesionales de todo el mundo.</p>
                        </div>
                    </div>
                </section>

                    </div>
                    </div>
    )
}

export default About;