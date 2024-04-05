document.addEventListener("DOMContentLoaded", function() {
    obtenerLibrosPopulares();
});

function obtenerLibrosPopulares() {
    let url = '../Controladores/configuracion_model.php'; // La URL de tu controlador PHP
    
    let datosGenerales = {
        accion : "consultarLibros",
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
        // console.log(data);
        if (data) {
            alert("Usuario Registrado con Exito");
            location.reload();
        } else {
            alert("Correo en Uso");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
