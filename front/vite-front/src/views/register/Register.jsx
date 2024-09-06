import React from "react";
import axios from "axios"
import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css"
import validateUser from "../../helpers/validateUser";
const POSTUSER_URL = "http://localhost:3000/users/register"



const Register = () => {

    const navigate = useNavigate()

    const initialState = {
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        birthdate: "",
        nDni: "",
      }
      
      
      const [user, setUser] = useState(initialState);
      const [errors, setErrors] = useState(initialState);
      
      const handleChange = (event) => {
        const {name, value} = event.target;
        setUser({...user, [name]: value})
        setErrors(validateUser({...user, [name]: value}));
      };

      
      
      const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            name: user.name,
            email: user.email,
            birthdate: user.birthdate,
            nDni: user.nDni,
            username: user.username,
            password: user.password,
        }
       
        axios.post(POSTUSER_URL, userData)
        .then(({ data }) => {
            alert(data.message);
            console.log(data);
            setUser(initialState);
            navigate("/iniciarSesion");            
        })
        .catch(error =>{
            alert(`Se ha producido un error al crear el usuario. ${error.response.data.message}`)
        })

    }
    
      const handleClear = () => {
        setUser(initialState);
        setErrors(initialState); 
      }


      const formData = [
          {label: "Nombre", name: "name", type: "text",},
          {label: "Usuario", name: "username", type: "text",},
          {label: "Contraseña", name: "password", type: "password",},
          {label: "Confirmar Contraseña", name: "confirmPassword", type: "password",},
          {label: "Email", name: "email", type: "text",},
          {label: "Fecha de Nacimiento", name: "birthdate", type: "date",},
          {label: "Numero de Indentificacion", name: "nDni", type: "text",},
      
      ]

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.tittleH2}>Registro</h2>
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
                <div className={styles.divClean}  onClick={handleClear}>
                    Limpiar formulario
                </div>
            <Link to="/iniciarSesion">
                <p>¿Ya estas registrado?</p>
            </Link>
            </form>
        </div>
    )
}

export default Register;