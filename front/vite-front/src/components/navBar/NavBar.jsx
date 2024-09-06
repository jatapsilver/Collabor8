import logo from "../../assets/logo.jpg";
import avatar from "../../assets/avatar.png";
import { Link, useNavigate } from "react-router-dom"
import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";



const Navbar = () => {      
    
    const login = useSelector(state => state.actualUser.userData.login)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        const  confirmed = window.confirm("¿Deseas cerrar sesion?")
        if (confirmed) {
            dispatch(setUserData({login: false, user:{}}))
        }
    }

    return(
        <div className= {styles.navbarContainer}>
            <div className= {styles.logo}>
                <Link to="/">
                <img src={logo} alt ="Logo Collabor8" />
                </Link>
            </div>
            <div className= {styles.link}>
                <Link to="/inicio">
                <span>Inicio</span>
                </Link>

                <Link to="/nosotros">
                <span>Nosotros</span>
                </Link>

                {login && (
                <Link to="/turnos">
                <span>Turnos</span>
                </Link>
                )}

                {login && (
                <Link to="/solicitarTurno">
                <span>Sacar turno</span>
                </Link>
                )}

                <Link to="/contactenos">
                <span>Contactenos</span>
                </Link>

                {login ? 
                <Link to="/">
                <span onClick={handleLogout}>Cerra Sesion</span>
                </Link> 
                : <Link to="/iniciarSesion">
                <span >Iniciar Sesion</span>
                </Link> 
                }

            </div>
            <div className= {styles.avatar}>
                <Link to="/iniciarSesion">
                <img src={avatar} alt ="Avatar" />
                </Link>
            </div>
        </div>
    )
}

export default Navbar;