let url = '../Controladores/conf_configuracion.php';

$('#tablaCompras').DataTable({
    paging: true,        // Activa la paginación
    searching: true,     // Activa el cuadro de búsqueda
    ordering: true,      // Activa el ordenamiento de columnas
    info: true,         // Muestra información sobre la tabla
    columnDefs: [
        {"width": "15%", "targets": 0},
        {"width": "10%", "targets": 1},
        {"width": "40%", "targets": 2},
        {"width": "10%", "targets": 3},
        {"width": "25%", "targets": 4},
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
        let empleado = registro.nombre + " " + registro.apellidopaterno + "" + registro.apellidomaterno;
        let total = registro.total;
        let idPaypal = registro.idordenpaypal;

        tabla.row.add([
            idVenta,
            fecha,
            empleado,
            total,
            idPaypal,
            "pene"
        ]).draw();
    });
}