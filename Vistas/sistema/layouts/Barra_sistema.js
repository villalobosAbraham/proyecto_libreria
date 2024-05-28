function cerrarSesion() {
    let url = '../Controladores/log_login.php';
    let datosGenerales = {
        accion: "CONFCerrarSesion",
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
            window.location.href = "/Vistas/login.php";
        } else {
            alert("Error al Cerrar Sesión");
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

