<html lang="es">
    <head>
        <?php include '../layouts/barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/carrito.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
        <script src="https://www.sandbox.paypal.com/sdk/js?client-id=ASPtULJO0N61cesGR4RGVfFCJC8RwvZtCInYe5kcf9Yf06j2Y4u1Ik5vbuxsj1r-TsgffhFUFH6vvLFO&currency=MXN"></script>
        <title>Carrito</title>
    </head>
    <body>
        <main>
            <section id="cuerpo">
                <div id="libros"></div>

                <div id="espacio"></div>
                
                <div id="pagos">
                    <h1 id="tituloPagar">Realizar Pago</h1>
                    <h2 id="h2totalPrecioBase" class="h2Carrito">Total Precio Base: </h2>
                    <h2 id="h2TotalPrecioBaseNumero" class="h2CarritoNumero" totalPrecioBaseAnterior=""></h2>
                    <h2 id="h2TotalDescuento" class="h2Carrito">Total Descuento: </h2>
                    <h2 id="h2TotalDescuentoNumero" class="h2CarritoNumero" totalDescuentoAnterior=""></h2>
                    <h2 id="h2TotalIva" class="h2Carrito">Total I.V.A.: </h2>
                    <h2 id="h2TotalIvaNumero" class="h2CarritoNumero" totalIvaAnterior=""></h2>
                    <h2 id="h2CostoTotal" class="h2Carrito">Costo Total: </h2>
                    <h2 id="h2CostoTotalNumero" class="h2CarritoNumero" totalCarritoAnterior="">Costo Total: </h2>
                    <br>
                    <button id="botonComprarCarrito"><i class="fa fa-credit-card"></i> Realizar Compra</button>
                </div>
            </section>
        </main>
        <footer>
            <p>Copyright &copy; 2024 Librería digital</p>
        </footer>
    </body>
    <div id="myModal" class="modal">
        <div id="modalCarrito" class="modal-content">
            <span class="close">&times;</span>
            <h1>Realizar Compra</h1>
            <h2 id="totalModal"></h2>
            <div id="paypal-button-container"></div>
        </div>
    </div>
</html>

<script src="../Vistas/js/carrito.js"></script>