let url = '/Controladores/conf_configuracion.php';

$('#tablaLibros').DataTable({
    paging: true,        // Activa la paginación
    pageLength : 10,
    lengthChange : false,
    searching: true,     // Activa el cuadro de búsqueda
    ordering: true,      // Activa el ordenamiento de columnas
    info: true,         // Muestra información sobre la tabla
    columnDefs: [
        {"width": "5%", "targets": 0},
        {"width": "15%", "targets": 1},
        {"width": "15%", "targets": 2},
        {"width": "15%", "targets": 3},
        {"width": "10%", "targets": 4},
        {"width": "15%", "targets": 5},
        {"width": "10%", "targets": 6},
        {"width": "10%", "targets": 7},
        {"width": "5%", "targets": 8},
    ],
});

$(document).ready(function() {
    obtenerLibros();
    rellenarModal();
});

function obtenerLibros() {
    let datosGenerales = {
        accion : "CONFObtenerLibros"
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
            mostrarLibros(data);
        } else { 
            mensajeError("Fallo al Cargar Los Libros");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarLibros(libros) {
    let tabla = $("#tablaLibros").DataTable();
    tabla.clear().draw();

    libros.forEach(function(libro) {
        let titulo = libro.titulo;
        let genero = libro.genero;
        let idioma = libro.idioma;
        let editorial = libro.editorial;
        let paginas = libro.paginas;

        let input = prepararInputLibros(libro.idlibro); 
        let autores = prepararAutores(libro.autores);
        let fechaPublicacion = prepararFecha(libro.fechapublicacion);
        let estado = prepararEstadoLibro(libro.activo);

        tabla.row.add([
            input,
            titulo,
            autores,
            genero,
            idioma,
            editorial,
            fechaPublicacion,
            paginas,
            estado,
        ]).draw(false);

        tabla.draw();
    });
}

function prepararInputLibros(idLibro) {
    let radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.name = "opcionLibro";
        radioInput.setAttribute('idLibro', idLibro);
    return radioInput;
}

function prepararAutores(autores) {
    autores = autores.replace("  ", " y ");
    return autores;
}

function prepararFecha(fecha) {
    return fecha.split("-").reverse().join("/")
}

function prepararEstadoLibro(estado) {
    if (estado == "S") {
        return "Activo";
    } else {
        return "Inactivo"
    }
}

function abrirModalAgregarCarrito() {
    let modal = document.getElementById("modalLibro");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function cerrarModalLibro() {
    limpiarModalLibro();

    let modal = document.getElementById("modalLibro");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
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
    
    $("#nombreLibro").attr("value", "").text("");
    $("#fechaLibro").val("");
}

function inhabilitarLibro() {
    let idLibro = $('input[name="opcionLibro"]:checked').attr('idLibro');

    let datosGenerales = prepararDatosGeneralesDeshabilitarLibro();
}

function prepararDatosGeneralesDeshabilitarLibro() {
    let idLibro = $('input[name="opcionLibro"]:checked').attr('idLibro');
}