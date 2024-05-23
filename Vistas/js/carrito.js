let url = '../Controladores/conf_configuracion.php';  

document.addEventListener('DOMContentLoaded', function() {
    // cargarBotonPaypal();
    comprobarUsuario();
    obtenerLibrosCarrito();
});

window.addEventListener('pageshow', function(event) {
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
        if (!data) {
            window.open("/Vistas/login.php", "_self");
            return;
        } 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

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
    let listaLibros = document.getElementById('libros');
    listaLibros.innerHTML = '';
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
        
        let precioReal = prepararPrecioReal(libro);

        let input = document.createElement('input');
        
        let botonBorrar = document.createElement("button");
        
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
        botonBorrar.classList.add("botonBorrar");

        portadaLibro.src = libro.portada;

        tituloLibro.textContent = libro.titulo;
        autorLibro.textContent = prepararTextoAutor(libro.autor);
        textoPrecio.textContent = "Precio Base: " + libro.precio;
        textoDescuento.textContent = "Descuento: " + libro.descuento;
        textoIva.textContent = "Iva: " + libro.iva;
        textoPrecioReal.textContent = "Precio Real Individual: " + precioReal;
        textoCosto.textContent = "$" + (precioReal * libro.cantidad);
        botonBorrar.innerText = "Borrar Libro";

        textoCosto.setAttribute("totalAnterior", precioReal * libro.cantidad);

        input.onchange = function() {
            actualizarPrecios(input, textoCosto, libro.idLibro);
        }

        botonBorrar.onclick = function() {
            borrarLibroCarrito(libro.idlibro);
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
        divCostoLibro.appendChild(botonBorrar);

        divDatosLibro.appendChild(divPrecioLibro);
        divDatosLibro.appendChild(divCostoLibro);
        
        divLibro.appendChild(divPortadaLibro);
        divLibro.appendChild(divDatosLibro);
        
        listaLibros.appendChild(divLibro);

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
    input.value = libro.cantidad; 
    input.min = 1; 
    input.max = libro.limiteLibro;
    input.step = 1;

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

function borrarLibroCarrito(idLibro) {
    let datosGenerales = {
        accion : "VENBorrarLibroCarrito",
        idLibro : idLibro
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
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function actualizarPrecios(input, textoCosto, idLibro) {    
    actualizarPrecioDivLibro(input, textoCosto);
    actualizarPrecioDivPagos(input);
    // let datosGenerales = {
    //     accion : "VENActualizarCantidadCarrito",
    //     idLibro : idLibro,
    //     cantidad : input.value,
    // }

    // fetch(url, {
    //     method: 'POST',
    //     headers: {  
    //     'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(datosGenerales)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data);
    //     if (data) {
    //         actualizarPrecioDivLibro(input, textoCosto);
    //         actualizarPrecioDivPagos(input);
    //     } else {
    //         alert("Error al Modificar la Cantidad");
    //         location.reload();
    //     }
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
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

function cargarBotonPaypal() {
    let contenedorPaypal = document.getElementById("paypal-button-container");
    contenedorPaypal.innerHTML = "";

    let totalCompra = document.getElementById("h2CostoTotalNumero").getAttribute("totalCarritoAnterior");
    let totalCarrito = document.getElementById("totalModal");

    totalCarrito.innerText = "El Total de su Compra Sera de: $" + totalCompra;
    paypal.Buttons({
        // Configuración del pago
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: totalCompra // El monto del pago
                    }
                }]
            });
        },
        // Ejecuta cuando el pago se apru ba
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                console.log(details);

                let payerName = details.payer.name.given_name;
                let payerSurname = details.payer.name.surname;
                let payerEmail = details.payer.email_address;
    
                // Accede a información específica del pedido
                let orderId = details.id;
                let purchaseAmount = details.purchase_units[0].amount.value;
                let currencyCode = details.purchase_units[0].amount.currency_code;
    
                // Accede a información de la transacción
                let transactionStatus = details.status;
    
                // Consola de salida con todos los detalles
                console.log('Detalles del Pago:');
                console.log('Nombre del Comprador: ' + payerName);
                console.log('Apellido del Comprador: ' + payerSurname);
                console.log('Email del Comprador: ' + payerEmail);
                console.log('ID del Pedido: ' + orderId);
                console.log('Monto de la Compra: ' + purchaseAmount);
                console.log('Código de Moneda: ' + currencyCode);
                console.log('Estado de la Transacción: ' + transactionStatus);
                alert('Pago completado por ' + details.payer.name.given_name);

                limpiarCarrito();
            });
        },
        // Maneja los errores del pago
        onError: function(err) {
            console.error(err);
        }
    }).render('#paypal-button-container'); // Renderiza el botón en el contenedor especificado
}

let modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
let btn = document.getElementById("botonComprarCarrito");

// Obtener el elemento span que cierra el modal
let span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, abrir el modal
btn.onclick = function() {
    cargarBotonPaypal();
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

// Cuando el usuario haga clic en el elemento span (x), cerrar el modal
span.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

// // Cuando el usuario haga clic en cualquier parte fuera del modal, cerrar el modal
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function limpiarCarrito() {
    let datosGenerales = {
        accion : "VENLimpiarCarritoCompra",
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
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}