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
        let precioElemento = document.createElement('h4');
        let descuentoElemento = document.createElement('h4');
        let ivaElemento = document.createElement('h4');
        let totalElemento = document.createElement('h4');
        
        let botonElemento = document.createElement('button');

        tituloElemento.textContent = titulo;
        autorElemento.textContent = completoAutor;
        fechaElemento.textContent = "Fecha de Publicacion: " + fechaPublicacion.split("-").reverse().join("/");
        precioElemento.textContent = "Precio: " + precio;
        descuentoElemento.textContent = "Descuento: " + descuento;
        ivaElemento.textContent = 'IVA: ' + iva;
        totalElemento.textContent = 'Total: ' + costoIndividual;

        botonElemento.textContent = "Agregar a Carrito";
        botonElemento.setAttribute("idLibro", idLibro);
        botonElemento.setAttribute("precio", precio);
        botonElemento.setAttribute("descuento", descuento);
        botonElemento.setAttribute("iva", iva);
        botonElemento.setAttribute("costoIndividual", costoIndividual);

        botonElemento.addEventListener('click', function() {
            agregarLibroCarrito(botonElemento);
        });
        imagen.src = portada;
        
        elementoLista.appendChild(imagen);
        elementoLista.appendChild(tituloElemento);
        elementoLista.appendChild(autorElemento);
        elementoLista.appendChild(fechaElemento);
        elementoLista.appendChild(precioElemento);
        elementoLista.appendChild(descuentoElemento);
        elementoLista.appendChild(ivaElemento);
        elementoLista.appendChild(totalElemento);
        elementoLista.appendChild(botonElemento);
        
        let lista = document.getElementById('listaPopulares');
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
