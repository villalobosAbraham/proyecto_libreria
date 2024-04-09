let url = '../Controladores/conf_configuracion.php'; // La URL de tu controlador PHP

document.addEventListener('DOMContentLoaded', function() {
    obtenerLibrosPopulares();
});

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

        let imagen = document.createElement('img');
        
        let tituloElemento = document.createElement('h2');
        let autorElemento = document.createElement('h3');
        let fechaElemento = document.createElement('h4');
        let totalElemento = document.createElement('h4');
        
        let botonElemento = document.createElement('button');

        tituloElemento.textContent = titulo;
        autorElemento.textContent = completoAutor;
        fechaElemento.textContent = "Fecha de Publicacion: " + fechaPublicacion.split("-").reverse().join("/");
        totalElemento.textContent = 'Costo: ' + costoIndividual;

        botonElemento.textContent = "Agregar a Carrito";
        botonElemento.setAttribute("idLibro", idLibro);
        botonElemento.setAttribute("costoIndividual", costoIndividual);

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
        console.log(data);
        if (data) {
            alert("awebo si jala");
            return;
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });

    function prepararDatosGeneralesAgregarCarrito(boton) {
        let idLibro = boton.getAttribute('idLibro');

        let datosGenerales = {
            accion : "VENAgregarLibroCarrito",
            idLibro : idLibro,
        }

        return datosGenerales;
    }
}
