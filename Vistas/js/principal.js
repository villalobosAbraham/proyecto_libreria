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
        let autores = registro.autores
        
        let completoAutor = prepararTextoAutor(autores);
        let costoIndividual = precio - descuento + iva;

        let elementoLista = document.createElement('li');
        elementoLista.classList.add('libroPrincipal');

        let imagen = document.createElement('img');
        
        let tituloElemento = document.createElement('h2');
        let autorElemento = document.createElement('h3');
        let fechaElemento = document.createElement('h4');
        let totalElemento = document.createElement('h4');
        
        let botonAgregarCarrito = document.createElement('button');
        let botonDetallesLibro = document.createElement('button');

        let iconoAgregar = document.createElement('i');
        let iconoDetalles = document.createElement('i');

        iconoAgregar.classList.add('fa-solid', 'fa-plus'); // Agregar clases para el ícono
        iconoDetalles.classList.add('fa-solid', 'fa-info'); // Agregar clases para el ícono
        botonAgregarCarrito.classList.add("botonLibroPrincipal");
        botonDetallesLibro.classList.add("botonDetallesLibro");
        autorElemento.classList.add('autorElemento');
        
        tituloElemento.textContent = titulo;
        autorElemento.textContent = completoAutor;
        fechaElemento.textContent = "Fecha de Publicacion: " + fechaPublicacion.split("-").reverse().join("/");
        totalElemento.textContent = 'Costo: ' + costoIndividual;
        
        botonAgregarCarrito.textContent = "Agregar a Carrito ";
        botonAgregarCarrito.setAttribute("idLibro", idLibro);
        botonAgregarCarrito.setAttribute("costoIndividual", costoIndividual);
        botonAgregarCarrito.appendChild(iconoAgregar);
        
        botonAgregarCarrito.addEventListener('click', function() {
            agregarLibroCarrito(botonAgregarCarrito);
        });
        
        botonDetallesLibro.textContent = "Ver Detalles ";
        botonDetallesLibro.appendChild(iconoDetalles);

        botonDetallesLibro.addEventListener('click', function() {
            verDatellesLIbro(registro);
        });

        imagen.src = portada;
        
        elementoLista.appendChild(imagen);
        elementoLista.appendChild(tituloElemento);
        elementoLista.appendChild(autorElemento);
        elementoLista.appendChild(fechaElemento);
        elementoLista.appendChild(totalElemento);
        elementoLista.appendChild(botonAgregarCarrito);
        elementoLista.appendChild(botonDetallesLibro);
        
        lista.appendChild(elementoLista);
    }
}

function prepararTextoAutor(autores) {
    autores = autores.replace("  ", " y ");
    return autores;
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

}
function prepararDatosGeneralesAgregarCarrito(boton) {
    let idLibro = boton.getAttribute('idLibro');

    let datosGenerales = {
        accion : "VENAgregarAumentarLibroCarrito",
        idLibro : idLibro,
        aumento : 1,
    }

    return datosGenerales;
}

function verDatellesLIbro(libro) {
    let titulo = libro.titulo;
    let portada = libro.portada;
    console.table(libro);
    let autores = prepararTextoAutor(libro.autores);
    let fechaPublicacion = libro.fechapublicacion;
    let genero = libro.genero;
    let paginas = libro.paginas;
    let idioma = libro.idioma;
    let editorial = libro.editorial;
    let sinopsis = libro.sinopsis;

    document.getElementById('tituloModal').textContent = titulo;
    document.getElementById('autoresLibro').textContent = "Autor(es): " + autores;
    document.getElementById('añoPublicacionLibro').textContent = "Fecha de Publicacion: " + fechaPublicacion.split("-").reverse().join("/");
    document.getElementById('generoLibroDetalles').textContent = "Genero: " + genero;
    document.getElementById('cantidadPaginas').textContent = "Cantidad de Paginas: " + paginas;
    document.getElementById('idiomaLibro').textContent = "Idioma del Libro: " + idioma;
    document.getElementById('editorialLibro').textContent = "Editorial: " + editorial;
    document.getElementById('pSinopsisLibro').innerText = sinopsis;
    document.getElementById('imagenLibroDetalles').src = portada;


    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

}

function cerrarModalDetalles() {
    let modal = document.getElementById("myModal");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}
