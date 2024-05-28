document.addEventListener("DOMContentLoaded", function() {
    comprobarCarrito();
    // setInterval(comprobarCarrito(), 3000);
});

function cerrarSesion() {
    let url = '../Controladores/log_login.php';
    let datosGenerales = {
        accion : "CONFCerrarSesion",
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
            window.open("/Vistas/login.php", "_self");
        } else {
            alert("Error al Cerrar Sesion");
            return;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function comprobarCarrito() {
    let url = "../Controladores/log_login.php";

    let datosGenerales = {
        accion : "CONFComprobarCarrito"
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
        if (data > 0) {
            console.log(data);
            let linkCarrito = document.getElementById("linkCarrito");
            linkCarrito.style.backgroundColor = "#442071";
            document.getElementById("iconoCarrito").innerText = " " + data;
        } else {
            console.log("no vale madre");
            document.getElementById("iconoCarrito").innerText = "";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}