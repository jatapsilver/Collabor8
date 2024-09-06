import styles from "./HomeCardOne.module.css"
import coworkImg1 from "../../assets/coworkImg1.jpg"

const HomeCardOne = () => {

    return(
        <div className={styles.container}>
           
                <div className={styles.containerText}>
                    <h1>Collabor8: Un espacio diseñado para fomentar la colaboración y conexión entre profesionales de distintas disciplinas. El número 8 simboliza un ciclo infinito de oportunidades y redes de trabajo.</h1>
                    <h4>El espacio de coworking donde la creatividad y la colaboración se encuentran. Ofrecemos soluciones flexibles y dinámicas para tus necesidades profesionales, desde salas de reuniones hasta estaciones de trabajo inspiradoras.”</h4>
                </div>
            
        </div>
    )

}

export default HomeCardOne