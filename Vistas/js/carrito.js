let url = '../Controladores/conf_configuracion.php'; // La URL de tu controlador PHP

document.addEventListener('DOMContentLoaded', function() {
    obtenerLibrosCarrito();
});

function obtenerLibrosCarrito() {
    let datosGenerales = {
        accion : "VENObtenerLibrosCarritoCompra",
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
        console.log(data);
        // if (data) {
        //     mostrarLibrosPopulares(data);
        // } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}