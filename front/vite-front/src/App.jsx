import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/navBar/NavBar"
import Home from "./views/home/Home"
import Appointments from "./views/appointments/Appoitments"
import Register from "./views/register/Register"
import Login from "./views/login/Login"
import About from "./views/abouts/About"
import Contact from "./views/contact/Contact"
import Schedule from "./views/schedule/Schedule"

 function App() {

  const {pathname} = useLocation();

  return(
    <>
      {/* {pathname !== "/" ? <Navbar /> : null}  */}
      {/* comentada para utilizar mas adelante */}
      <Navbar/>
      <Routes>
        <Route path="/" element={ <Home/>}/>
        <Route path="/inicio" element={ <Home/>}/>
        <Route path="/nosotros" element={<About />}/>
        <Route path="/turnos" element={ <Appointments/>}/>
        <Route path="/contactenos" element={ <Contact/>}/>
        <Route path="/registro" element={ <Register/>}/>
        <Route path="/iniciarSesion" element={<Login/> }/>
        <Route path="/solicitarTurno" element={<Schedule/> }/>
      </Routes>

        
        
        
    </>
  )
 }

 export default App
