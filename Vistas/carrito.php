<html lang="es">
    <head>
        <?php include '..\layouts\barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/carrito.css">
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
                    <button id="botonComprarCarrito">Realizar Compra</button>
                </div>
            </section>
        </main>
        <footer>
            <p>Copyright &copy; 2024 Librería digital</p>
        </footer>
    </body>
</html>

<script src="../Vistas/js/carrito.js"></script>