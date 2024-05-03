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
    let precioBaseAcumulado = 0;
    let descuentoAcumulado = 0;
    let ivaAcumulado = 0;
    let totalAcumulado = 0;
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
        let textoCosto = document.createElement('label');
        
        let input = document.createElement('input');
        
        let precioReal = prepararPrecioReal(libro);
        
        input = prepararInput(input, libro, precioReal);
    
        divLibro.classList.add('divLibro');
        divPortadaLibro.classList.add('divPortadaLibro');
        divDatosLibro.classList.add('divDatosLibro');
        divPrecioLibro.classList.add('divPrecioLibro');
        divCostoLibro.classList.add('divCostoLibro');
    
        portadaLibro.classList.add('portadaLibro');

        tituloLibro.classList.add('tituloLibro');
        autorLibro.classList.add('autorLibro');
        textoCosto.classList.add('textoCosto');

        portadaLibro.src = libro.portada;

        tituloLibro.textContent = libro.titulo;
        autorLibro.textContent = prepararTextoAutor(libro.autor);
        textoPrecio.textContent = "Precio Base: " + libro.precio;
        textoDescuento.textContent = "Descuento: " + libro.descuento;
        textoIva.textContent = "Iva: " + libro.iva;
        textoPrecioReal.textContent = "Precio Real Individual: " + precioReal;
        textoCosto.textContent = "$" + (precioReal * libro.cantidad);

        textoCosto.setAttribute("totalAnterior", precioReal * libro.cantidad);

        input.onchange = function() {
            actualizarPrecios(input, textoCosto);
        }
        
        divPortadaLibro.appendChild(portadaLibro);
        
        divDatosLibro.appendChild(tituloLibro);
        divDatosLibro.appendChild(autorLibro);
        
        divPrecioLibro.appendChild(textoPrecio);
        divPrecioLibro.appendChild(textoDescuento);
        divPrecioLibro.appendChild(textoIva);
        divPrecioLibro.appendChild(textoPrecioReal);

        divCostoLibro.appendChild(textoCosto);
        divCostoLibro.appendChild(input);

        divDatosLibro.appendChild(divPrecioLibro);
        divDatosLibro.appendChild(divCostoLibro);
        
        divLibro.appendChild(divPortadaLibro);
        divLibro.appendChild(divDatosLibro);
        
        lista.appendChild(divLibro);

        precioBaseAcumulado+=  parseFloat(libro.precio * libro.cantidad);
        descuentoAcumulado+= parseFloat(libro.descuento * libro.cantidad);
        ivaAcumulado+= parseFloat(libro.iva * libro.cantidad);
        totalAcumulado+= parseFloat(precioReal * libro.cantidad);
    }
    mostrarCostosCarrito(precioBaseAcumulado, descuentoAcumulado, ivaAcumulado, totalAcumulado);
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

function prepararInput(input, libro, precioReal) {
    input.type = 'number';
    input.id = libro.idlibro;
    input.name = 'libro';
    input.value = libro.cantidad; // Valor inicial
    input.min = 0; 
    input.max = libro.limiteLibro; // Valor máximo permitido
    input.step = 1; // Incremento/decrement

    input.classList.add('input');

    input.setAttribute("precioBase", libro.precio);
    input.setAttribute("descuento", libro.descuento);
    input.setAttribute("iva", libro.iva);
    input.setAttribute("precioReal", precioReal);
    input.setAttribute("cantidadAnterior", libro.cantidad);
    input.setAttribute("precioTotalAnterior", precioReal * libro.cantidad);
    // botonElemento.setAttribute("idLibro", idLibro);

    return input;
}

function actualizarPrecios(input, textoCosto) {    
    actualizarPrecioDivLibro(input, textoCosto);
    actualizarPrecioDivPagos(input);
}

function actualizarPrecioDivLibro(input, textoCosto) {
    let precioRealIndividual = input.getAttribute("precioReal");
    let cantidad = input.value;
    let precioTotalNuevo = precioRealIndividual * cantidad;

    textoCosto.textContent = "$" + precioTotalNuevo;
}

function actualizarPrecioDivPagos(input) {
    let cantidadNuevo = input.value;

    let precioBase =  parseFloat(input.getAttribute("precioBase"));
    let descuento =  parseFloat(input.getAttribute("descuento"));
    let iva =  parseFloat(input.getAttribute("iva"));
    // let precioReal = input.getAttribute("precioReal");
    let cantidadAnterior =  parseFloat(input.getAttribute("cantidadAnterior"));
    let precioTotalAnterior =  parseFloat(input.getAttribute("precioTotalAnterior"));
    
    let precioBaseAnteriorLibro = precioBase * cantidadAnterior;
    let descuentoAnteriorLibro = descuento * cantidadAnterior;
    let ivaAnteriorLibro = iva * cantidadAnterior;

    let precioBaseNuevoLibro = precioBase * cantidadNuevo;
    let descuentoNuevoLibro = descuento * cantidadNuevo;
    let ivaNuevoLibro = iva * cantidadNuevo;
    let precioTotalNuevo = precioBaseNuevoLibro - descuentoNuevoLibro + ivaNuevoLibro;

    let h2TotalPrecioBaseNumero = document.getElementById("h2TotalPrecioBaseNumero");
    let h2TotalDescuentoNumero = document.getElementById("h2TotalDescuentoNumero");
    let h2TotalIvaNumero = document.getElementById("h2TotalIvaNumero");
    let h2CostoTotalNumero = document.getElementById("h2CostoTotalNumero");

    let totalPrecioBaseAnterior = parseFloat(h2TotalPrecioBaseNumero.getAttribute("totalPrecioBaseAnterior"));
    let totalDescuentoAnterior = parseFloat(h2TotalDescuentoNumero.getAttribute("totalDescuentoAnterior"));
    let totalIvaAnterior = parseFloat(h2TotalIvaNumero.getAttribute("totalIvaAnterior"));
    let totalCarritoAnterior = parseFloat(h2CostoTotalNumero.getAttribute("totalCarritoAnterior"));

    totalPrecioBaseAnterior = totalPrecioBaseAnterior - precioBaseAnteriorLibro + precioBaseNuevoLibro;
    totalDescuentoAnterior = totalDescuentoAnterior - descuentoAnteriorLibro + descuentoNuevoLibro;
    totalIvaAnterior = totalIvaAnterior - ivaAnteriorLibro + ivaNuevoLibro;
    totalCarritoAnterior = totalCarritoAnterior - precioTotalAnterior + precioTotalNuevo;

    h2TotalPrecioBaseNumero.setAttribute("totalPrecioBaseAnterior",totalPrecioBaseAnterior);
    h2TotalDescuentoNumero.setAttribute("totalDescuentoAnterior",totalDescuentoAnterior);
    h2TotalIvaNumero.setAttribute("totalIvaAnterior",totalIvaAnterior);
    h2CostoTotalNumero.setAttribute("totalCarritoAnterior",totalCarritoAnterior);

    input.setAttribute("cantidadAnterior", cantidadNuevo);
    input.setAttribute("precioTotalAnterior", precioTotalNuevo);

    h2TotalPrecioBaseNumero.textContent = "$" + totalPrecioBaseAnterior;
    h2TotalDescuentoNumero.textContent = "$" + totalDescuentoAnterior;
    h2TotalIvaNumero.textContent = "$" + totalIvaAnterior;
    h2CostoTotalNumero.textContent = "$" + totalCarritoAnterior;
}

function mostrarCostosCarrito(precioBaseAcumulado, descuentoAcumulado, ivaAcumulado, totalAcumulado) {
    let precioBaseH2 = document.getElementById("h2TotalPrecioBaseNumero");
    let descuentoH2 = document.getElementById("h2TotalDescuentoNumero");
    let ivaH2 = document.getElementById("h2TotalIvaNumero");
    let totalH2 = document.getElementById("h2CostoTotalNumero");

    precioBaseH2.textContent = "$" + precioBaseAcumulado;
    descuentoH2.textContent = "$" + descuentoAcumulado;
    ivaH2.textContent = "$" + ivaAcumulado;
    totalH2.textContent = "$" + totalAcumulado;

    precioBaseH2.setAttribute("totalPrecioBaseAnterior", precioBaseAcumulado);
    descuentoH2.setAttribute("totalDescuentoAnterior", descuentoAcumulado);
    ivaH2.setAttribute("totalIvaAnterior", ivaAcumulado);
    totalH2.setAttribute("totalCarritoAnterior", totalAcumulado);
} 