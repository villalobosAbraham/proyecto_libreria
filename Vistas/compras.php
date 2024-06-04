<html lang="es">
    <head>
        <?php include '../layouts/barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/compras.css">
        <title>Mis Compras</title>
    </head>
    <body>
        <header>
            <h1>Compras Anteriores</h1>
        </header>
        <br>
        <main>
            <div style="width: 100%;">
                <table id="tablaCompras" class="tablaCompras">
                    <thead>
                        <tr>
                            <th>Id Venta</th>
                            <th>Fecha</th>
                            <th>Empleado Entrego</th>
                            <th>Total de Pago</th>
                            <th>Id Pago Paypal</th>
                            <th></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </main>
        <footer>
            <p>Copyright &copy; 2024 Librería digital</p>
        </footer>
    </body>
</html>
<div id="myModal" class="modal" style="display: none;">
    <div id="modalDetallesCompra" class="modal-content">
        <span id="cerrarModalDetalles" class="close" onclick="cerrarModalDetalles()">&times;</span>
        <h1 id="tituloModal" style="text-align: center;">Detalles de Compra</h1>
        <div style="min-width: 100%";>
            <table id="tablaDetallesCompra" class="tablaCompras">
                <thead>
                    <tr>
                        <th>Libro</th>
                        <th>Costo Individual</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>

<script src="/Vistas/js/compras.js"></script>