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
    // inicializarModalAgregarLibro();
    // comprobarUsuario();
    // obtenerUsuarioBarra();

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

function cerrarModalLibro() {
    let uploadedImage = document.getElementById('uploadedImage');
    let imagenRuta = uploadedImage.getAttribute("urlImagen"); 
    if (imagenRuta) {
        borrarImagenSubida();
    }
    let modal = document.getElementById("modalAutor");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    limpiarModalLibro();
}

function limpiarModalLibro() {
    let autor = $('<option>').attr('value', '-1').text('Seleccionar Autor'); 
    let genero = $('<option>').attr('value', '-1').text('Seleccionar Genero'); 
    let editorial = $('<option>').attr('value', '-1').text('Seleccionar Editorial'); 
    let idioma = $('<option>').attr('value', '-1').text('Seleccionar Idioma'); 
    
    $("#autorLibro").empty().append(autor);
    $("#generoLibro").empty().append(genero);
    $("#editorialLibro").empty().append(editorial);
    $("#idiomaLibro").empty().append(idioma);
    
    $("#nombreLibro").val("").text("");
    $("#fechaLibro").val("");
    $("#sinopsis").val("");
    $("#precioBaseLibro").val("0").trigger("change");

    inicializarAutores();
}

function inicializarModalAgregarLibro() {
    inicializarAutores();
}

function inicializarAutores() {
    let datosGenerales = {
        accion : "CONFObtenerAutoresActivos"
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
            let autor = $("<option>").attr("value", "-1").text("Seleccionar Autor");
            $("#autorLibro").empty().append(autor);
            data.forEach(function(registro) {
                let idAutor = registro.idautor;
                let nombreAutor = registro.nombre;
                let apellidoPaternoAutor = registro.apellidopaterno;
                let apellidoMaternoAutor = registro.apellidomaterno;
                let nombreCompleto = nombreAutor + " " + apellidoPaternoAutor + " " + apellidoMaternoAutor;
                autor = $("<option>").attr("value", idAutor).text(nombreCompleto)
                $("#autorLibro").append(autor);
            });
        } else { 
            mensajeError("Fallo al Obtener Autores, Se Recomienda Recargar");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function abrirModalConfirmarAgregar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Agregar Libro",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Agregar"
      }).then((result) => {
        if (result.isConfirmed) {
            agregarLibro();
        }
      });
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

