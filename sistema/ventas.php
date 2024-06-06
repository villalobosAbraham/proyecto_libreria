<html lang="es">
    <head>
        <?php include 'layouts/barra_sistema.php'; ?>
        <link rel="stylesheet" href="estilos/ventas.css">
        <title>Mis Compras</title>
    </head>
    <body>
        <header>
            <h1>Registro de Ventas</h1>
        </header>
        <br>
        <main>
            <div style="width: 100%;">
                <table id="tablaVentas" class="tablaVentas">
                    <thead>
                        <tr>
                            <th>Id Venta</th>
                            <th>Fecha</th>
                            <th>Usuario Compro</th>
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
    <div id="modalDetallesVenta" class="modal-content">
        <span id="cerrarModalDetalles" class="close" onclick="cerrarModalDetalles()">&times;</span>
        <h1 id="tituloModal" style="text-align: center;">Detalles de Venta</h1>
        <div class="row">
            <div class="column">
                <label class="label-control-modal">Id Venta</label>
                <input type="text" id="idVentaModal" class="input-text-control-modal" disabled>
            </div>
            <div class="column">
                <label class="label-control-modal">Id Pago Paypal</label>
                <input type="text" id="idPagoPaypalModal" class="input-text-control-modal" disabled>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label class="label-control-modal">Fecha</label>
                <input type="date" id="fechaModal" class="input-text-control-modal" disabled>
            </div>
            <div class="column">
                <label class="label-control-modal">Estado Entrega</label>
                <input type="text" id="estadoEntregaModal" class="input-text-control-modal" disabled>
            </div>
        </div>
        <div class="row">
            <div class="column">
                <label class="label-control-modal">Comprador</label>
                <input type="text" id="compradorModal" class="input-text-control-modal" disabled>
            </div>
            <div class="column">
                <label class="label-control-modal">Vendedor Entrego</label>
                <input type="text" id="vendedorEntregoModal" class="input-text-control-modal" disabled>
            </div>
        </div>
        <div style="min-width: 100%";>
            <table id="tablaDetallesVenta" class="tablaVentas">
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

<script src="js_sistema/ventas.js"></script>