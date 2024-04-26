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
        if (data) {
            mostrarLibrosCarrito(data);
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function mostrarLibrosCarrito(libros) {
    let lista = document.getElementById('libros');
    lista.innerHTML = '';
    for (let libro of libros) {
        let divLibro = document.createElement('div');
        let divPortadaLibro = document.createElement('div');
        let divDatosLibro = document.createElement('div');
        let divPrecioLibro = document.createElement('div');
        let divCostoLibro = document.createElement('div');

        let portadaLibro = document.createElement("img");
        let tituloLibro = document.createElement('h2');
        let autorLibro = document.createElement('h3');
        let textoPrecio = document.createElement('label');
        let textoDescuento = document.createElement('label');
        let textoIva = document.createElement('label');
        let textoPrecioReal = document.createElement('label');
    
        divLibro.classList.add('divLibro');
        divPortadaLibro.classList.add('divPortadaLibro');
        divDatosLibro.classList.add('divDatosLibro');
        divPrecioLibro.classList.add('divPrecioLibro');
        divCostoLibro.classList.add('divCostoLibro');
    
        portadaLibro.classList.add('portadaLibro');

        tituloLibro.classList.add('tituloLibro');
        autorLibro.classList.add('autorLibro');

        let precioReal = prepararPrecioReal(libro);

        portadaLibro.src = libro.portada;

        tituloLibro.textContent = libro.titulo;
        autorLibro.textContent = prepararTextoAutor(libro.autor);
        textoPrecio.textContent = "Precio Base: " + libro.precio;
        textoDescuento.textContent = "Descuento: " + libro.descuento;
        textoIva.textContent = "Iva: " + libro.iva;
        textoPrecioReal.textContent = "Precio Real Individual: " + precioReal;

        
        divPortadaLibro.appendChild(portadaLibro);
        
        divDatosLibro.appendChild(tituloLibro);
        divDatosLibro.appendChild(autorLibro);
        
        divPrecioLibro.appendChild(textoPrecio);
        divPrecioLibro.appendChild(textoDescuento);
        divPrecioLibro.appendChild(textoIva);
        divPrecioLibro.appendChild(textoPrecioReal);

        divDatosLibro.appendChild(divPrecioLibro);
        divDatosLibro.appendChild(divCostoLibro);
        
        divLibro.appendChild(divPortadaLibro);
        divLibro.appendChild(divDatosLibro);
        
        lista.appendChild(divLibro);
    }

}

function prepararTextoAutor(autores) {
    autores = autores.replace("  ", " y ");
    return autores;
}

function prepararPrecioReal(libro) {
    let precioBase = parseFloat(libro.precio);
    let descuento = parseFloat(libro.descuento);
    let iva = parseFloat(libro.iva);

    let precioReal = precioBase - descuento + iva;

    return precioReal;
}