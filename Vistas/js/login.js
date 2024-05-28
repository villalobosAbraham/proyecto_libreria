document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        iniciarSesion();
    }
});

function iniciarSesion() {
    let url = '../Controladores/log_login.php';

    let datosGenerales = prepararDatosGeneralesInicioSesion();

    if (!datosGenerales) {
        alert("Correo o Contraseña Invalidos");
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
        if (!data) {
            alert("Usuario o Contraseña Incorrectos");
            return;
        } 

        if (data.idTipoUsuario == 1) {
            window.open("/Vistas/principal.php", "_self");
        } else {
            window.open("../Vistas/sistema/iniciosistema.php", "_self");
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function prepararDatosGeneralesInicioSesion() {
    let correo = document.getElementById("correoLogin").value;
    let contraseña = document.getElementById("contraseñaLogin").value;

    if (correo == "" || contraseña == "") {
        return false;
    }

    let datosGenerales = {
        accion: "login",
        correo: correo,
        contraseña: contraseña
    };

    return datosGenerales;
}

function registrarUsuario() {
    let url = '../Controladores/log_login.php'; 

    let datosGenerales = prepararDatosGeneralesRegistro();
    if (!datosGenerales) {
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

function prepararDatosGeneralesRegistro() {
    let correo = document.getElementById("correoRegistro").value;
    let contraseña = document.getElementById("contraseñaRegistro").value;
    let nombre = document.getElementById("nombres").value;
    let apellidoPaterno = document.getElementById("apellidoPaterno").value;
    let apellidoMaterno = document.getElementById("apellidoMaterno").value;

    let vacio = "";

    if (correo == vacio || contraseña == vacio || nombre == vacio) {
        return false;
    }

    let datosGenerales = {
        accion : "registro",
        correo : correo,
        contraseña : contraseña,
        nombre : nombre,
        apellidoPaterno : apellidoPaterno,
        apellidoMaterno : apellidoMaterno
    };

    return datosGenerales;
}

function mostrarRegistro() {
    document.getElementById("login").style.display = "none";
    document.getElementById("registro").style.display = "block";
}

function mostrarLogin() {
    document.getElementById("login").style.display = "block";
    document.getElementById("registro").style.display = "none";
}

function convertirImagen(imagen) {
    let file = imagen.files[0];
    let reader = new FileReader();

    
    reader.readAsDataURL(file);
    
    reader.onload = function(event) {
        let base64String = event.target.result;
        console.log(base64String); // Aquí tienes la cadena codificada en base64
        
        let imagen = document.createElement('img');
        imagen.src = base64String;
    
        // Agregar la imagen al contenedor en la página
        let contenedor = document.getElementById('contenedorImagen');
        contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar la imagen
        contenedor.appendChild(imagen);
    };
}

function base62Encode(data) {
    let charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";

    // Convertir datos binarios en un número entero
    let num = 0;
    for (let i = 0; i < data.length; i++) {
        num = num * 256 + data[i];
    }

    // Convertir el número entero a Base62
    while (num > 0) {
        result = charset[num % 62] + result;
        num = Math.floor(num / 62);
    }

    return result;
}

let uploadForm = document.getElementById('uploadForm');
let imageInput = document.getElementById('imageInput');
let customNameInput = document.getElementById('customName');
let uploadedImage = document.getElementById('uploadedImage');
let deleteButton = document.getElementById('deleteButton');

let currentImageUrl = '';

uploadForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let url = '../Controladores/upload.php'; 

    let formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('customName', customNameInput.value);

    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.imageUrl) {
            currentImageUrl = "../Controladores/" + data.imageUrl;
            uploadedImage.src = currentImageUrl;
            uploadedImage.style.display = 'block';
            deleteButton.style.display = 'block';
        } else {
            console.error('Error uploading image.');
        }
    })
    .catch(error => {
        console.error('Error uploading image:', error);
    });
});

deleteButton.addEventListener('click', function() {
    let url = '../Controladores/upload.php'; 
    if (currentImageUrl) {
        let formData = new FormData();
        formData.append('deleteImage', currentImageUrl);

        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                uploadedImage.src = '';
                uploadedImage.style.display = 'none';
                deleteButton.style.display = 'none';
                currentImageUrl = '';
            } else {
                console.error(data.message);
            }
        })
        .catch(error => {
            console.error('Error deleting image:', error);
        });
    }
});