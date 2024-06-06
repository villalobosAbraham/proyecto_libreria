let url = '/Controladores/conf_configuracion.php';

$('#tablaAutores').DataTable({
    paging: true,        // Activa la paginación
    pageLength : 10,
    lengthChange : false,
    searching: true,     // Activa el cuadro de búsqueda
    ordering: true,      // Activa el ordenamiento de columnas
    info: true,         // Muestra información sobre la tabla
    // columnDefs: [
    //     {"width": "5%", "targets": 0},
    //     {"width": "25%", "targets": 1},
    //     {"width": "25%", "targets": 2},
    //     {"width": "15%", "targets": 3},
    //     {"width": "10%", "targets": 4},
    //     {"width": "15%", "targets": 5},
    //     {"width": "5%", "targets": 6},
    // ],
});

$(document).ready(function() {
    obtenerAutores();
    inicializarNaciones();

    let barra = document.querySelector('.barra_sistema');
    let modal = document.querySelector('.modalAutor');
    let barraAltura = parseFloat(barra.offsetHeight) + 5; 
    modal.style.paddingTop = barraAltura + 'px';
    // modal.style.paddingTop = barraAltura + 'px';
});

window.addEventListener('pageshow', function(event) {
    comprobarUsuario();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if ($("#modalAutor").css("display") == "block") {
            $("#modalAutor").css("display", "none");
        }
    }
});

function obtenerAutores() {
    let datosGenerales = {
        accion : "CONFObtenerAutores"
    };

    fetch(url, {
        method: 'POST',
        headers: {  
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosGenerales)
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            mostrarAutores(data);
        } else { 
            mensajeError("Fallo al Cargar Los Libros");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarAutores(autores) {
    let tabla = $("#tablaAutores").DataTable();
    tabla.clear().draw();

    autores.forEach(function(autor) {
        let nombreAutor = autor.nombre;
        let apellidoPaternoAutor = autor.apellidopaterno;
        let apellidoMaternoAutor = autor.apellidomaterno;
        let nacionalidad = autor.nacionalidad;

        let input = prepararInputAutores(autor.idautor); 
        let fechanacimiento = prepararFecha(autor.fechanacimiento);
        let estado = prepararEstadoAutor(autor.activo);

        tabla.row.add([
            input,
            nombreAutor,
            apellidoPaternoAutor,
            apellidoMaternoAutor,
            fechanacimiento,
            nacionalidad,
            estado,
        ]).draw(false);

    });
    tabla.draw();
}

function prepararInputAutores(idAutor) {
    let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = "opcionAutor";
        radioInput.setAttribute('idAutor', idAutor);
    return radioInput;
}

function prepararFecha(fecha) {
    return fecha.split("-").reverse().join("/")
}

function prepararEstadoAutor(estado) {
    if (estado == "S") {
        return "Activo";
    } else {
        return "Inactivo"
    }
}

function abrirModalAgregarAutor() {
    let modal = document.getElementById("modalAutor");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarModalAutor() {
    let modal = document.getElementById("modalAutor");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    limpiarModalAutor();
}

function limpiarModalAutor() {
    let nacionalidad = $('<option>').attr('value', '-1').text('Seleccionar Nacionalidad'); 
    $("#nacionalidadAutor").empty().append(nacionalidad);
    
    $("#nombreAutor, #apellidoPaternoAutor, #apellidoMaternoAutor, #fechaAutor").val("");
    inicializarNaciones();
}

function inicializarNaciones() {
    let datosGenerales = {
        accion : "CONFObtenerNacionesActivas"
    };

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
            let nacion = $("<option>").attr("value", "-1").text("Seleccionar Nación");
            $("#nacionalidadAutor").empty().append(nacion);
            data.forEach(function(registro) {
                let idNacionalidad = registro.idnacionalidad;
                let nacionalidad = registro.nacionalidad;
                let siglas = registro.siglas;
                let nacionalidadCompleta = siglas + " | " + nacionalidad;
                autor = $("<option>").attr("value", idNacionalidad).text(nacionalidadCompleta)
                $("#nacionalidadAutor").append(autor);
            });
        } else { 
            mensajeError("Fallo al Obtener Nacionalidades, Se Recomienda Recargar");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function abrirModalConfirmarAgregar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Agregar Autor",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Agregar"
      }).then((result) => {
        if (result.isConfirmed) {
            agregarAutor();
        }
      });
}

function agregarAutor() {
    let datosGenerales = prepararDatosGeneralesAgregarAutor();
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
            mensajeFunciono("Autor Agregado Correctamente");
            obtenerAutores();
            cerrarModalAutor();
        } else { 
            mensajeError("Fallo al Obtener Nacionalidades, Se Recomienda Recargar");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesAgregarAutor() {
    let nombre = $("#nombreAutor").val();
    let apellidoPaterno = $("#apellidoPaternoAutor").val();
    let apellidoMaterno = $("#apellidoMaternoAutor").val();
    let fechaNacimiento = $("#fechaAutor").val(); 
    let idNacionalidad = $("#nacionalidadAutor").find(":selected").val();

    let regexNombreApellido = /^[A-Za-z]{3,}(?:\s[A-Za-z]{3,})?$/;
    let regexFecha = /^(18|19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

    if(!regexNombreApellido.test(nombre)) {
        return "Nombre Invalido";
    } else if(!regexNombreApellido.test(apellidoPaterno)) {
        return "Apellido Paterno Invalido";
    } else if(!regexNombreApellido.test(apellidoMaterno)) {
        return "Apellido Materno Invalido";
    } else if (!regexFecha.test(fechaNacimiento)) {
        return "Fecha Invalida";
    } else if(idNacionalidad == "-1") {
        return "Nacionalidad Invalida";
    } 

    let datosGenerales = {
        accion : "CONFAgregarAutor",
        nombre : nombre,
        apellidoPaterno : apellidoPaterno,
        apellidoMaterno : apellidoMaterno,
        fechaNacimiento : fechaNacimiento,
        idNacionalidad : idNacionalidad,
    }

    return datosGenerales;
}

function abrirModalConfirmarDeshabilitar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Se Deshabilitara el Autor y Simultaneamente los Libros del Autor",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Deshabilitar"
    }).then((result) => {
    if (result.isConfirmed) {
        inhabilitarAutor();
    }
    });
}


function inhabilitarAutor() {
    let datosGenerales = prepararDatosGeneralesDeshabilitarAutor();
    if (!datosGenerales) {
        mensajeError("Autor no Seleccionado");
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
            mensajeFunciono("Autor Deshabilitado Correctamente");
            obtenerAutores();
        } else { 
            mensajeError("Fallo al Deshabilitar Autor");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesDeshabilitarAutor() {
    let seleccionado = $('input[name="opcionAutor"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idAutor = $('input[name="opcionAutor"]:checked').attr('idAutor');

    let datosGenerales = {
        accion : "CONFDeshabilitarAutor",
        idAutor : idAutor
    };

    return datosGenerales;
}

function abrirModalConfirmarHabilitar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Habilitar Autor",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Habilitar"
    }).then((result) => {
    if (result.isConfirmed) {
        habilitarAutor();
    }
    });
}


function habilitarAutor() {
    let datosGenerales = prepararDatosGeneralesHabilitarAutor();
    console.table(datosGenerales);
    if (!datosGenerales) {
        mensajeError("Autor no Seleccionado");
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
            mensajeFunciono("Autor Habilitado Correctamente");
            obtenerAutores();
        } else { 
            mensajeError("Fallo Habilitar Autor");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesHabilitarAutor() {
    let seleccionado = $('input[name="opcionAutor"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idAutor = $('input[name="opcionAutor"]:checked').attr('idAutor');

    let datosGenerales = {
        accion : "CONFHabilitarAutor",
        idAutor : idAutor
    };

    return datosGenerales;
}

