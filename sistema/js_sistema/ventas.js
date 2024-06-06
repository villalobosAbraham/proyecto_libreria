let url = '/Controladores/conf_configuracion.php';

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        if ($("#myModal").css("display") == "block") {
            $("#myModal").css("display", "none");
        }
    }
});

$('#tablaVentas').DataTable({
    paging: true,        // Activa la paginación
    pageLength : 10,
    lengthChange : false,
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
$('#tablaDetallesVenta').DataTable({
    paging: true,        // Activa la paginación
    pageLength : 10,
    lengthChange : false,
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
    obtenerVentas();
    let barra = document.querySelector('.barra_sistema');
    let main = document.querySelector('body');
    let barraAltura = barra.offsetHeight; 
    main.style.paddingTop = barraAltura + 'px';
});

function obtenerVentas() {
    let datosGenerales = {
        accion : "CONFObtenerVentas",
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
            mostrarVentas(data);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarVentas(data) {
    let tabla = $("#tablaVentas").DataTable();
    tabla.clear().draw();

    data.forEach(function(registro) {
        let idVenta = registro.idventa;
        let fecha = registro.fecha;
        let empleado = "Usuario Eliminado";
        if (registro.idusuariocompra != 0) {
            empleado = registro.nombre + " " + registro.apellidopaterno + " " + registro.apellidomaterno;
        }
        let total = registro.total;
        let idPaypal = registro.idordenpaypal;
        let boton = prepararBotonDetalles(idVenta, registro.estado);

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

function prepararBotonDetalles(idVenta, estado) {
    let boton = document.createElement("button");
    boton.textContent = "Ver Detalles ";
    boton.addEventListener('click', function() {
        obtenerDetallesVenta(idVenta);
        obtenerVenta(idVenta);
    });
    boton.classList.add("botonDetallesCompra")
    let iconoDetalles = document.createElement('i');
    iconoDetalles.classList.add('fa-solid', 'fa-info');
    boton.appendChild(iconoDetalles);

    if (estado = "Recogido") {
        let botonEntregar = document.createElement("button");
        botonEntregar.textContent = "Entregar";
        botonEntregar.addEventListener('click', function() {
            confirmarEntregarVenta(idVenta);
        });
    }

    return boton;
}

function obtenerDetallesVenta(idVenta) {
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

function obtenerVenta(idVenta) {
    let datosGenerales = {
        accion : "CONFObtenerVenta",
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
        if (data) {
            let idVenta = data.idventa;
            let idPaypl = data.idordenpaypal;
            let fecha = prepararFecha(data.fecha);
            let estadoEntrega = data.estado;
            let comprador = data.nombreComprador + " " + data.apellidoPaternoComprador + " " + data.apelidoMaternoComprador; 
            let vendedor = "Sin Entregar";
            if (data.idvendedor != null && data.idvendedor != undefined && data.idvendedor != 0) {
                vendedor = data.nombreVendedor + " " + data.apellidoPaternoVendedor + " " + data.apellidoMaternoVendedor; 
            }

            $("#idVentaModal").val(idVenta);
            $("#idPagoPaypalModal").val(idPaypl);
            $("#fechaModal").val(fecha);
            $("#estadoEntregaModal").val(estadoEntrega);
            $("#compradorModal").val(comprador);
            $("#vendedorEntregoModal").val(vendedor);
        } else {
            mensajeError("Error al Obtener la Venta");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararFecha(fecha) {
    return fecha.split("-").reverse().join("/")
}

function confirmarEntregarVenta(idVenta) {
    Swal.fire({
        title: "Estas Seguro?",
        text: "Confirmar Entregar Venta",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Entregar"
    }).then((result) => {
        if (result.isConfirmed) {
            entregarVenta(idVenta);
        }
    });
}

function entregarVenta(idVenta) {
    let datosGenerales = {
        accion : "CONFEntregarVenta",
        idVenta : idVenta
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
            mensajeFuncion("Venta Entregada Correctamente");
            obtenerVentas();
        } else {
            mensajeError("Error al Entregar Venta");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarLibrosVenta(libros) {
    let tabla = $("#tablaDetallesVenta").DataTable();
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
