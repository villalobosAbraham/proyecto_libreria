let url = '/Controladores/conf_configuracion.php';

$('#tablaInventario').DataTable({
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
    obtenerInventarioLibros();

    let barra = document.querySelector('.barra_sistema');
    let modal = document.querySelector('.modalInventario');
    let barraAltura = parseFloat(barra.offsetHeight) + 5; 
    modal.style.paddingTop = barraAltura + 'px';
    // modal.style.paddingTop = barraAltura + 'px';
});

window.addEventListener('pageshow', function(event) {
    comprobarUsuario();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if ($("#modalInventario").css("display") == "block") {
            $("#modalInventario").css("display", "none");
        }
    }
});

function obtenerInventarioLibros() {
    let datosGenerales = {
        accion : "CONFObtenerInventarioLibros"
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
            mostrarInventarioLibros(data);
        } else { 
            mensajeError("Fallo al Cargar Los Libros");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarInventarioLibros(inventarioLibros) {
    let tabla = $("#tablaInventario").DataTable();
    tabla.clear().draw();

    inventarioLibros.forEach(function(inventario) {
        let titulo = inventario.titulo;
        let genero = inventario.genero;
        let idioma = inventario.idioma;
        let editorial = inventario.editorial;

        let input = prepararInputInventarioLibro(inventario.idlibro); 
        let estado = prepararEstadoAutor(inventario.activo);
        let cantidad = prepararCantidadInventarioLibro(inventario.cantidad);

        tabla.row.add([
            input,
            titulo,
            genero,
            idioma,
            editorial,
            cantidad,
            estado,
        ]).draw(false);
    });
    tabla.draw();
}

function prepararInputInventarioLibro(idLibro) {
    let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = "opcionInventarioLibro";
        radioInput.setAttribute('idLibro', idLibro);
    return radioInput;
}

function prepararEstadoAutor(estado) {
    if (estado == "S") {
        return "Activo";
    } else {
        return "Inactivo"
    }
}

function prepararCantidadInventarioLibro(cantidad) {
    if (cantidad == undefined || cantidad == null || cantidad == 0) {
        return 0
    }

    return cantidad;
}

function abrirModalModificarInventario() {
    let modal = document.getElementById("modalInventario");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function obtenerInformacionLibro() {
    let datosGenerales = prepararDatosGeneralesDatosInventarioLibro()
    if (!datosGenerales) {
        mensajeError("Seleccionar Libro");
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
            mostrarDatosLibroInventarioModal(data);
            abrirModalModificarInventario();
        } else { 
            mensajeError("Error al Modificar Inventario");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesDatosInventarioLibro() {
    let seleccionado = $('input[name="opcionInventarioLibro"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idLibro = $('input[name="opcionInventarioLibro"]:checked').attr('idLibro');

    let datosGenerales = {
        accion : "CONFObtenerDatosInventarioLibro",
        idLibro : idLibro
    };

    return datosGenerales;
}

function mostrarDatosLibroInventarioModal(libro) {
    let titulo = libro.titulo;
    let autores = prepararAutores(libro.autores);
    let cantidad = 0;
    if (libro.cantidad && libro.cantidad != null && libro.cantidad != undefined) {
        cantidad = libro.cantidad;
    }

    $("#libroModal").val(titulo);
    $("#autorLibroModal").val(autores);
    $("#InventarioActualModal").val(cantidad);
}

function prepararAutores(autores) {
    autores = autores.replace("  ", " y ");
    return autores;
}

function cerrarModalAutor() {
    let modal = document.getElementById("modalInventario");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    limpiarModalInventario();
}

function limpiarModalInventario() {
    $("#libroModal, #autorLibroModal, #InventarioActualModal").val("");

    $("#inventarioNuevaCantidad").val("0");
}

function abrirModalConfirmarAgregar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Modificar Inventario Libro",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Modificar"
      }).then((result) => {
        if (result.isConfirmed) {
            modificarInventarioLibro();
        }
      });
}

function modificarInventarioLibro() {
    let datosGenerales = prepararDatosGeneralesModificarInventarioLibro();
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
            mensajeFunciono("Inventario Modificado Correctamente");
            obtenerInventarioLibros();
            cerrarModalAutor();
        } else { 
            mensajeError("Error al Modificar Inventario");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesModificarInventarioLibro() {
    let seleccionado = $('input[name="opcionInventarioLibro"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idLibro = $('input[name="opcionInventarioLibro"]:checked').attr('idLibro');
    let cantidad = $("#inventarioNuevaCantidad").val();

    let regexNumeroEntero = /^\d+$/;

    if (!regexNumeroEntero.test(cantidad) || cantidad < 0) {
        "Ingresar Cantidad Valida";
    }

    let datosGenerales = {
        accion : "CONFModificarInventarioLibro",
        idLibro : idLibro,
        cantidad : cantidad,
    }

    return datosGenerales;
}

function abrirModalConfirmarDeshabilitar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Se Deshabilitara el Inventario y Los Carritos de Compra",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Deshabilitar"
    }).then((result) => {
    if (result.isConfirmed) {
        inhabilitarInventario();
    }
    });
}


function inhabilitarInventario() {
    let datosGenerales = prepararDatosGeneralesDeshabilitarInventario();
    if (!datosGenerales) {
        mensajeError("Inventario de Libro no Seleccionado");
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
            mensajeFunciono("Inventario de Libro Deshabilitado Correctamente");
            obtenerInventarioLibros();
        } else { 
            mensajeError("Fallo al Deshabilitar Inventario de Libro");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesDeshabilitarInventario() {
    let seleccionado = $('input[name="opcionInventarioLibro"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idLibro = $('input[name="opcionInventarioLibro"]:checked').attr('idLibro');

    let datosGenerales = {
        accion : "CONFDeshabilitarInventario",
        idLibro : idLibro
    };

    return datosGenerales;
}

function abrirModalConfirmarHabilitar() {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Habilitar Inventario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Habilitar"
    }).then((result) => {
    if (result.isConfirmed) {
        habilitarInventario();
    }
    });
}


function habilitarInventario() {
    let datosGenerales = prepararDatosGeneralesHabilitarInventario();
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
            mensajeFunciono("Inventario de Libro Habilitado Correctamente");
            obtenerInventarioLibros();
        } else { 
            mensajeError("Fallo Habilitar Inventario de Libro");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesHabilitarInventario() {
    let seleccionado = $('input[name="opcionInventarioLibro"]:checked');
    if (seleccionado.length <= 0) {
        return false;
    }

    let idLibro = $('input[name="opcionInventarioLibro"]:checked').attr('idLibro');

    let datosGenerales = {
        accion : "CONFHabilitarInventario",
        idLibro : idLibro
    };

    return datosGenerales;
}

