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

document.addEventListener("DOMContentLoaded", function() {
    comprobarCarritoCantidad();
    obtenerUsuarioBarra();

    let barra = document.querySelector('.barra');
    let modal = document.querySelector('.modalUsuario');
    let barraAltura = barra.offsetHeight; 
    modal.style.paddingTop = barraAltura + 'px';
});

function cerrarSesion() {
    let url = '../Controladores/log_login.php';
    let datosGenerales = {
        accion : "CONFCerrarSesion",
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
        if (data) {
            window.open("/Vistas/login.php", "_self");
        } else {
            alert("Error al Cerrar Sesion");
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function comprobarCarritoCantidad() {
    let url = "../Controladores/log_login.php";

    let datosGenerales = {
        accion : "CONFComprobarCarritoCantidad"
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
        if (data > 0) {
            let linkCarrito = document.getElementById("linkCarrito");
            linkCarrito.style.backgroundColor = "#442071";
            document.getElementById("iconoCarrito").innerText = " " + data;
        } else {
            document.getElementById("iconoCarrito").innerText = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function obtenerUsuarioBarra() {
    let url = "../Controladores/log_login.php";

    let datosGenerales = {
        accion : "CONFObtenerUsuarioBarra"
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
        if (data) {
            let usuario = data.nombre;
            if (data.apellidopaterno.length > 0) {
                usuario = usuario + " " + data.apellidopaterno;
            }
            if (data.apellidomaterno.length > 0) {
                usuario = usuario + " " + data.apellidomaterno;
            }
            document.getElementById("iconoUsuario").innerText = "   " + usuario;

            llenarModalUsuario(data);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function abrirModalUsuario() {
    let modal = document.getElementById("modalUsuario");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarModalUsuario() {
    let nombre = $("#nombreUsuario").attr("nombre");
    let apellidoPaterno = $("#apellidoPaternoUsuario").attr("apellidoPaterno");
    let apellidoMaterno = $("#apellidoMaternoUsuario").attr("apellidoMaterno");
    let correo = $("#correoUsuario").attr("correo");
    let telefono = $("#telefonoUsuario").attr("telefono");
    let fechaNacimiento = $("#fechaUsuario").attr("fechaNacimiento");
    
    $("#nombreUsuario").val(nombre);
    $("#apellidoPaternoUsuario").val(apellidoPaterno);
    $("#apellidoMaternoUsuario").val(apellidoMaterno);
    $("#correoUsuario").val(correo);
    $("#telefonoUsuario").val(telefono);
    $("#fechaUsuario").val(fechaNacimiento);

    let modal = document.getElementById("modalUsuario");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function llenarModalUsuario(usuario) {
    let nombre = usuario.nombre;
    let apellidoPaterno = usuario.apellidopaterno;
    let apellidoMaterno = usuario.apellidomaterno;
    let correo = usuario.email;
    let telefono = usuario.telefono;
    let fechaNacimiento = usuario.fechanacimiento;

    $("#nombreUsuario").val(nombre).attr("nombre", nombre);
    $("#apellidoPaternoUsuario").val(apellidoPaterno).attr("apellidoPaterno", apellidoPaterno);
    $("#apellidoMaternoUsuario").val(apellidoMaterno).attr("apellidoMaterno", apellidoMaterno);
    $("#correoUsuario").val(correo).attr("correo", correo);
    $("#telefonoUsuario").val(telefono).attr("telefono", telefono);

    if (fechaNacimiento != null) {
        // fechaNacimiento = fechaNacimiento.split("-").reverse().join("/");
        $("#fechaUsuario").val(fechaNacimiento).attr("fechaNacimiento", fechaNacimiento);
    } else {
        $("#fechaUsuario").val("").attr("fechaNacimiento", "");
    }
}

function guardarInformacionUsuarioModal() {
    let url = "../Controladores/log_login.php";
    let datosGenerales = prepararDatosGeneralesGuardarInformacionUsuarioModal();
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
        if (data) {
            setTimeout(() => {
                location.reload();
            }, 4000);
            mensajeFunciono("Usuario Modificado Correctamente");
        } else {
            mensajeError("Fallo al Modificar el Usuario");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesGuardarInformacionUsuarioModal() {
    let nombre = $("#nombreUsuario").val();
    let apellidoPaterno = $("#apellidoPaternoUsuario").val();
    let apellidoMaterno = $("#apellidoMaternoUsuario").val();
    let correo = $("#correoUsuario").val();
    let telefono = $("#telefonoUsuario").val();
    let fechaNacimiento = $("#fechaUsuario").val();

    // let regexContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    let regexCorreo = /^(?=.*[A-Za-z])[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    let regexTelefono = /^\d{10}$/;
    let regexFecha = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    let regxNombreApellido = /^[A-Za-z]{3,}$/;

    if (!regexCorreo.test(correo)) {
        return "Correo Invalido";
    // } else if(!regexContraseña.test(contraseña)) {
    //     return "Contraseña Invalida<br>Obligatorio:<br>1 Mayúscula<br>1 Minúscula<br>1 Número<br>Mínimo 8 Carácteres";
    } else if(!regxNombreApellido.test(nombre)) {
        return "Nombre Invalido";
    } else if(!regxNombreApellido.test(apellidoPaterno)) {
        return "Apellido Paterno Invalido";
    } else if(apellidoMaterno != "" && !regxNombreApellido.test(apellidoMaterno)) {
        return "Apellido Materno Invalido";
    } else if(!regexTelefono.test(telefono)) {
        return "Telefono Invalido";
    } else if(!regexFecha.test(fechaNacimiento)) {
        return "Fecha Invalida";
    }

    let datosGenerales = {
        accion : "CONFGuardarInformacionUsuarioModal",
        apellidoPaterno : apellidoPaterno,
        apellidoMaterno : apellidoMaterno,
        correo : correo,
        nombre : nombre,
        telefono : telefono,
        fechaNacimiento : fechaNacimiento,
    }

    return datosGenerales;
}