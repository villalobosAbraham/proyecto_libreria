function mensajeError(mensaje) {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
      });
}

function mensajeFunciono(mensaje) {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 3000
      });
}

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        if ($("#registro").css("display") == "none") {
            iniciarSesion();
        } else {
            registrarUsuario();
        }
    }
});

function iniciarSesion() {
    let url = '../Controladores/log_login.php';

    let datosGenerales = prepararDatosGeneralesInicioSesion();

    if (!datosGenerales) {
        mensajeError("Correo o Contraseña Invalidos");
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
        if (!data) {
            mensajeError("Perfil Inexistente o Deshabilitado");
            return;
        } 

        if (data.idTipoUsuario == 1) {
            window.open("/Vistas/principal.php", "_self");
        } else {
            window.open("/sistema/iniciosistema.php", "_self");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesInicioSesion() {
    let correo = document.getElementById("correoLogin").value;
    let contraseña = document.getElementById("contraseñaLogin").value;

    if (correo == "" || contraseña == "") {
        return false;
    }

    let datosGenerales = {
        accion: "login",
        correo: correo,
        contraseña: contraseña
    };

    return datosGenerales;
}

function registrarUsuario() {
    let url = '../Controladores/log_login.php'; 

    let datosGenerales = prepararDatosGeneralesRegistro();
    if (typeof datosGenerales === 'string') {
        mensajeError(datosGenerales);
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
        if (data === true) {
            mensajeFunciono("Usuario Registrado con Exito");
            setTimeout(() => {
                location.reload();
            }, 3000);
        } else {
            mensajeError(data);
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesRegistro() {
    let correo = document.getElementById("correoRegistro").value;
    let contraseña = document.getElementById("contraseñaRegistro").value;
    let nombre = document.getElementById("nombres").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;
    let telefono = document.getElementById("telefono").value;
    let fechaNacimiento = document.getElementById("fechaUsuario").value;

    let regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    let regexCorreo = /^(?=.*[A-Za-z])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let regexTelefono = /^\d{10}$/;
    let regexFecha = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    let regexNombreApellido = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})?$/;

    if (!regexCorreo.test(correo)) {
        return "Correo Invalido";
    } else if(!regexContraseña.test(contraseña)) {
        return "Contraseña Invalida<br>Obligatorio:<br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>Mínimo 8 Carácteres";
    } else if(!regexNombreApellido.test(nombre)) {
        return "Nombre Invalido";
    } else if(!regexNombreApellido.test(apellidoPaterno)) {
        return "Apellido Paterno Invalido";
    } else if(apellidoMaterno != "" && !regexNombreApellido.test(apellidoMaterno)) {
        return "Apellido Materno Invalido";
    } else if(!regexTelefono.test(telefono)) {
        return "Telefono Invalido";
    } else if(!regexFecha.test(fechaNacimiento)) {
        return "Fecha Invalida";
    }

    let datosGenerales = {
        accion : "registro",
        correo : correo,
        contraseña : contraseña,
        nombre : nombre,
        apellidoPaterno : apellidoPaterno,
        apellidoMaterno : apellidoMaterno,
        telefono : telefono,
        fechaNacimiento : fechaNacimiento,
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

// let uploadForm = document.getElementById('uploadForm');
// let imageInput = document.getElementById('imageInput');
// let customNameInput = document.getElementById('customName');
// let uploadedImage = document.getElementById('uploadedImage');
// let deleteButton = document.getElementById('deleteButton');

// let currentImageUrl = '';

// uploadForm.addEventListener('submit', function(event) {
//     event.preventDefault();
//     let url = '../Controladores/upload.php'; 

//     let formData = new FormData();
//     formData.append('image', imageInput.files[0]);
//     formData.append('customName', customNameInput.value);

//     fetch(url, {
//         method: 'POST',
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.imageUrl) {
//             currentImageUrl = "../Controladores/" + data.imageUrl;
//             uploadedImage.src = currentImageUrl;
//             uploadedImage.style.display = 'block';
//             deleteButton.style.display = 'block';
//         } else {
//             console.error('Error uploading image.');
//         }
//     })
//     .catch(error => {
//         console.error('Error uploading image:', error);
//     });
// });

// deleteButton.addEventListener('click', function() {
//     let url = '../Controladores/upload.php'; 
//     if (currentImageUrl) {
//         let formData = new FormData();
//         formData.append('deleteImage', currentImageUrl);

//         fetch(url, {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (data.status === 'success') {
//                 uploadedImage.src = '';
//                 uploadedImage.style.display = 'none';
//                 deleteButton.style.display = 'none';
//                 currentImageUrl = '';
//             } else {
//                 console.error(data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error deleting image:', error);
//         });
//     }
// });

function irPresentacion() {
    window.open("/index.php", "_self");
}