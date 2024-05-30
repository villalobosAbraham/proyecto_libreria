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
<div id="myModal" class="modal">
    <div id="modalDetallesLibro" class="modal-content">
        <span id="cerrarModalDetalles" class="close" onclick="cerrarModalDetalles()">&times;</span>
        <h1 id="tituloModal"></h1>
        <div id="divDetallesLibro">
            <div id="divImagenLibroDetalles">
                <img id="imagenLibroDetalles">
            </div>    
            <h5 id="autoresLibro"></h5>
            <h5 id="añoPublicacionLibro"></h5>
            <h5 id="generoLibroDetalles"></h5>
            <h5 id="cantidadPaginas"></h5>
            <h5 id="idiomaLibro"></h5>
            <h5 id="editorialLibro"></h5>
        </div>
        <div id="divSinopsisLibro">
            <p id="pSinopsisLibro"></p>
        </div>
    </div>
</div>

<script src="/Vistas/js/compras.js"></script>