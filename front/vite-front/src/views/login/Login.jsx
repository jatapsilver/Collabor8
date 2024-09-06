import React from "react";
import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router"
import styles from "./Login.module.css"
import { useDispatch } from "react-redux"
import { setUserData } from "../../redux/userSlice";
const POSTUSER_URL = "http://localhost:3000/users/login"

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate (); 

    const initialState = {
        username: "",
        password: "",
      }
            
      const [user, setUser] = useState(initialState);
      const [errors, setErrors] = useState(initialState);
      
      const validateUserLogin = ({username, password}) => {
        const errors = {};
        if(!username) errors.username = "Ingresar nombre de usuario";
        if(!password) errors.password = "Ingresar contraseña";
        return errors;
      }

      const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value})
        setErrors(validateUserLogin({...user, [name]: value}));
      };
      
      const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: user.username,
            password: user.password,
        }
       
        axios.post(POSTUSER_URL, userData)
        .then(({ data }) => {
            dispatch(setUserData(data));
            alert("Usuario logueado!");
            setUser(initialState);
            navigate("/turnos");            
        })
        .catch(error =>{
            alert(`Se ha producido un error. ${error.response.data.message}`)
        })
      }


      const formData = [
          {label: "Usuario", name: "username", type: "text",},
          {label: "Contraseña", name: "password", type: "password",},      
      ]

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.tittleH2}>Login</h2>
            <form onSubmit ={handleSubmit}>
               {
                formData.map (({label, name, type}) =>(
                    <div key={name}>
                    <label htmlFor={name}>{label}</label>
                    <input id={name} 
                    name={name} 
                    type={type} 
                    value={user[name]} 
                    placeholder={`Ingresar ${label.toLocaleLowerCase()}`} 
                    onChange={handleChange}
                    />
                    {errors[name] && <span style={{ color: "red" }}>{errors[name]}</span>}
                    </div>
                ))}
                <button type="submit" disabled={ Object.keys(user).some((e) => !user[e] )}>
                    Enviar
                </button>
                <Link to="/registro">
                <p>¿No estas registrado?</p>
                </Link>
            </form>

        </div>
    )
}

export default Login;