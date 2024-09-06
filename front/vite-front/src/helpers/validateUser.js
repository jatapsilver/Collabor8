const regexEmail = /\S+@\S+\.\S+/;
const regexLetter = /(?=.*[a-zA-Z])/;
const regexNumber = /(?=.*\d)/;
const regexSpecial = /(?=.*[@$!%*?&#])/;
const regexDate = /^\d{4}-\d{2}-\d{2}$/;
const regexUppercase = /(?=.*[A-Z])/;
const regexLowercase = /(?=.*[a-z])/;

const validateUser = ({
    name,
    username,
    password,
    confirmPassword,
    email,
    birthdate,
    nDni,
}) => {
    const errors = {};

    if (!name) errors.name = "Ingresar un nombre";
    else{
        if(name.length < 4) errors.name = "Nombre debe tener al menos 4 caracteres";
        if(name.length > 50) errors.name = "Nombre no puede ser mayor a 50 caracteres";
    }

    if (!email) errors.email = "Ingresar un email";
    else{
        if(!regexEmail.test(email))
            errors.email = "Email no tiene un formato valido";
    }

    if (!birthdate) errors.birthdate = "Ingresar fecha de nacimiento";
    else {
        if (!regexDate.test(birthdate))
            errors.birthdate = "Fecha de nacimiento no tiene un formato valido (YYYY-MM-DD)";
        const birthdateDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthdateDate.getFullYear();
        const monthDiff = today.getMonth() - birthdateDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdateDate.getDate())) {
            age--;
        }
        if (age < 18) errors.birthdate = "Debes ser mayor de edad";
    }

    if (!nDni) errors.nDni = "Ingresar número de DNI";
    else{
        if(isNaN(Number(nDni))) errors.nDni = "El DNI debe ser un numero";
        if(nDni < 0) errors.nDni = "El DNI debe ser un numero positivo";
    }

    if (!username) errors.username = "Ingresar un nombre de usuario";
    else{
        if(username.length < 4) errors.username = "Nombre de usuario debe tener al menos 4 caracteres";
        if(username.length > 20) errors.username = "Nombre de usuario no puede ser mayor a 20 caracteres";
    }

    if (!password) errors.password = "Ingresar una contraseña";
    else{
        if(password.length < 8) errors.password = "Contraseña debe tener al menos 8 caracteres";
        if(!regexUppercase.test(password)) errors.password = "Contraseña debe contener al menos una mayuscula";
        if(!regexLowercase.test(password)) errors.password = "Contraseña debe contener al menos una minuscula";
        if(!regexNumber.test(password)) errors.password = "Contraseña debe contener al menos un numero";
        if(!regexSpecial.test(password)) errors.password = "Contraseña debe contener al menos un caracter especial ($, @,!, %, *,?)";
    }

    if (password !== confirmPassword)
        errors.confirmPassword = "Las contraseñas no coinciden";
    
    return errors;
};

export default validateUser;