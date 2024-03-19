function iniciarSesion() {
    let url = '../Controladores/log_login.php'; // La URL de tu controlador PHP

    let data = {
        accion: "login",
        correo: document.getElementById("correoLogin").value,
        contraseña: document.getElementById("contraseñaLogin").value
    };

    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (!data) {
            alert("Usuario o Contraseña Incorrectos");
            return;
        } 

        if (data.idTipoUsuario == 1) {
            window.open("../Vistas/principal.php", "_self");
        } else {
            window.open("../Vistas/sistema/layouts/iniciosistema.php", "_self");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function registrarUsuario() {
    let url = '../Controladores/log_login.php'; // La URL de tu controlador PHP

    let datosGenerales = prepararDatosGeneralesRegistro();
    if (!datosGenerales) {
        return;
    }
    
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosGenerales)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data) {
            alert("Usuario Registrado con Exito");
            location.reload();
        } else {
            alert("Correo en Uso");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesRegistro() {
    let correo = document.getElementById("correoRegistro").value;
    let contraseña = document.getElementById("contraseñaRegistro").value;
    let nombre = document.getElementById("nombre").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;

    let vacio = "";

    if (correo == vacio || contraseña == vacio || nombre == vacio) {
        return false;
    }

    let datosGenerales = {
        accion : "registro",
        correo : correo,
        contraseña : contraseña,
        nombre : nombre,
        apellidoPaterno : apellidoPaterno,
        apellidoMaterno : apellidoMaterno
    };

    return datosGenerales;
}

function mostrarRegistro() {
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "block";
}

function mostrarLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
}