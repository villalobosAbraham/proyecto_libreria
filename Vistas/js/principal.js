let url = '../Controladores/conf_configuracion.php';

window.addEventListener('pageshow', function(event) {
    comprobarUsuario();
});

document.addEventListener('DOMContentLoaded', function() {
    comprobarUsuario();
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
        if (data) {
            obtenerLibrosPopulares();
        } else {
            window.open("/Vistas/login.php", "_self");
            return;
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function obtenerLibrosPopulares() {
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
        if (data) {
            mostrarLibrosPopulares(data);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarLibrosPopulares(data) {
    let lista = document.getElementById('listaPopulares');
    lista.innerHTML = '';
    for (let registro of data) {
        let idLibro = registro.idlibro;
        let titulo = registro.titulo;
        let precio = registro.precio;
        let descuento = registro.descuento;
        let iva = registro.iva;
        let fechaPublicacion = registro.fechapublicacion;
        let portada = registro.portada;
        let nombreAutor = registro.nombre;
        let apellidoPaternoAutor = registro.apellidopaterno;
        let apellidoMaternoAutor = registro.apellidomaterno;
        
        let completoAutor = nombreAutor + " " + apellidoPaternoAutor + " " + apellidoMaternoAutor;
        let costoIndividual = precio - descuento + iva;

        let elementoLista = document.createElement('li');
        elementoLista.classList.add('libroPrincipal');

        let imagen = document.createElement('img');
        
        let tituloElemento = document.createElement('h2');
        let autorElemento = document.createElement('h3');
        let fechaElemento = document.createElement('h4');
        let totalElemento = document.createElement('h4');
        
        let botonElemento = document.createElement('button');

        let iconoAgregar = document.createElement('i');
        iconoAgregar.classList.add('fa-solid', 'fa-plus'); // Agregar clases para el ícono
        botonElemento.classList.add("botonLibroPrincipal");
        
        tituloElemento.textContent = titulo;
        autorElemento.textContent = completoAutor;
        fechaElemento.textContent = "Fecha de Publicacion: " + fechaPublicacion.split("-").reverse().join("/");
        totalElemento.textContent = 'Costo: ' + costoIndividual;
        
        botonElemento.textContent = "Agregar a Carrito ";
        botonElemento.setAttribute("idLibro", idLibro);
        botonElemento.setAttribute("costoIndividual", costoIndividual);
        botonElemento.appendChild(iconoAgregar);

        botonElemento.addEventListener('click', function() {
            agregarLibroCarrito(botonElemento);
        });
        imagen.src = portada;
        
        elementoLista.appendChild(imagen);
        elementoLista.appendChild(tituloElemento);
        elementoLista.appendChild(autorElemento);
        elementoLista.appendChild(fechaElemento);
        elementoLista.appendChild(totalElemento);
        elementoLista.appendChild(botonElemento);
        
        lista.appendChild(elementoLista);
    }
}

function agregarLibroCarrito(boton) {
    let datosGenerales = prepararDatosGeneralesAgregarCarrito(boton);

    fetch(url, {
        method: 'POST',
        headers: {  
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosGenerales)
    })
    .then(response => response.json())
    .then(data => {
        comprobarCarrito();
        if (data) {
            return;
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function prepararDatosGeneralesAgregarCarrito(boton) {
        let idLibro = boton.getAttribute('idLibro');

        let datosGenerales = {
            accion : "VENAgregarAumentarLibroCarrito",
            idLibro : idLibro,
            aumento : 1,
        }

        return datosGenerales;
    }
}
