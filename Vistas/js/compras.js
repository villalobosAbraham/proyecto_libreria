let url = '../Controladores/conf_configuracion.php';

$('#tablaCompras').DataTable({
    paging: true,        // Activa la paginación
    searching: true,     // Activa el cuadro de búsqueda
    ordering: true,      // Activa el ordenamiento de columnas
    info: true,         // Muestra información sobre la tabla
    columnDefs: [
        {"width": "15%", "targets": 0},
        {"width": "10%", "targets": 1},
        {"width": "30%", "targets": 2},
        {"width": "10%", "targets": 3},
        {"width": "25%", "targets": 4},
        {"width": "10%", "targets": 5},
    ],
});
$('#tablaDetallesCompra').DataTable({
    paging: true,        // Activa la paginación
    searching: true,     // Activa el cuadro de búsqueda
    ordering: true,      // Activa el ordenamiento de columnas
    info: true,         // Muestra información sobre la tabla
    columnDefs: [
        {"width": "25%", "targets": 0},
        {"width": "25%", "targets": 1},
        {"width": "25%", "targets": 2},
        {"width": "25%", "targets": 3},
    ],
});

$(document).ready(function() {
    comprobarUsuario();
    obtenerCompras();
    let barra = document.querySelector('.barra');
    let main = document.querySelector('body');
    let barraAltura = barra.offsetHeight; 
    main.style.paddingTop = barraAltura + 'px';
});

function comprobarUsuario() {
    let datosGenerales = {
        accion : "CONFComprobarUsuario",
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
            window.open("/Vistas/login.php", "_self");
            // return true;
        } //else {
        //     return false;;
        // } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function obtenerCompras() {
    let datosGenerales = {
        accion : "CONFObtenerComprasUsuario",
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
            mostrarCompras(data);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarCompras(data) {
    let tabla = $("#tablaCompras").DataTable();
    tabla.clear().draw();

    data.forEach(function(registro) {
        let idVenta = registro.idventa;
        let fecha = registro.fecha;
        let empleado = "Sin Entregar";
        if (registro.idvendedor != 0) {
            empleado = registro.nombre + " " + registro.apellidopaterno + "" + registro.apellidomaterno;
        }
        let total = registro.total;
        let idPaypal = registro.idordenpaypal;
        let boton = prepararBotonDetalles(idVenta);

        tabla.row.add([
            idVenta,
            fecha,
            empleado,
            total,
            idPaypal,
            boton
        ]).draw();
    });
}

function cerrarModalDetalles() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

function prepararBotonDetalles(idVenta) {
    let boton = document.createElement("button");
    boton.textContent = "Ver Detalles ";
    boton.addEventListener('click', function() {
        verDetallesLibro(idVenta);
    });
    boton.classList.add("botonDetallesCompra")
    let iconoDetalles = document.createElement('i');
    iconoDetalles.classList.add('fa-solid', 'fa-info');
    boton.appendChild(iconoDetalles);
    return boton;
}

function verDetallesLibro(idVenta) {
    let datosGenerales = {
        accion : "CONFObtenerDetallesVenta",
        idVenta : idVenta,
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
        if (data.length > 0) {
            mostrarLibrosVenta(data);
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        } else {
            mensajeError("Error al Obtener Los Detalles");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarLibrosVenta(libros) {
    let tabla = $("#tablaDetallesCompra").DataTable();
    tabla.clear().draw();

    libros.forEach(function(libro) {
        let titulo = libro.titulo;
        let precioBase = parseFloat(libro.precio);
        let descuentoBase = parseFloat(libro.descuento);
        let ivaBase = parseFloat(libro.iva);
        let costo = precioBase - descuentoBase + ivaBase;
        let cantidad = libro.cantidad;
        let total = libro.total;

        tabla.row.add([
            titulo,
            "$" + costo + " M.X.N.",
            cantidad + " Unidad(es)",
            "$" + total +  "M.X.N.",
        ]).draw();
    });
}
