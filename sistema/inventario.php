<html lang="es">
    <head>
        <?php include 'layouts/barra_sistema.php'; ?>
        <link rel="stylesheet" href="estilos/inventario.css">
        <title>Inventario Libros</title>
    </head>
    <br>
    <body>
        <header>
            <h1>Inventario Libros</h1>
        </header>
        <main>
            <div class="row">
                <button class="botonPrimario" onclick="obtenerInformacionLibro();">Modificar Inventario <i class="fa fa-pencil"></i></button>
                <button class="botonPrimario" onclick="abrirModalConfirmarDeshabilitar();">Inhabilitar Inventario <i class="fa fa-ban"></i></button>
                <button class="botonPrimario" onclick="abrirModalConfirmarHabilitar();">Habilitar Inventario <i class="fa fa-check"></i></button>
            </div>
            <div style="width: 95%; margin-left: 1%;">
                <table id="tablaInventario" class="tablaInventario">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Libro</th>
                            <th>Genero</th>
                            <th>Idioma</th>
                            <th>Editorial</th>
                            <th>Stock</th>
                            <th>Estado</th>
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
<div id="modalInventario" class="modalInventario" style="display: none;">
  <section id="contenidoModalInventario" class="contenidoModalInventario">
    <div class="headerModal">
      <h1 id="tituloModalInventario">Modificar Inventario</h1>
    </div>
    <div class="bodyModal">
        <div class="row">
            <label class="label-control">Libro</label>
            <input type="text" id="libroModal" class="input-control-modal" disabled>
        </div>
        <div class="row">
            <label class="label-control">Autor(es)</label>
            <input type="text" id="autorLibroModal" class="input-control-modal" disabled>
        </div>
        
        <div class="row">
            <label class="label-control">Inventario Actual</label>
            <input type="text" id="InventarioActualModal" class="input-control" disabled>
            <label class="label-control">Nueva Cantidad</label>
            <input type="number" id="inventarioNuevaCantidad" class="input-control" value="0" min="0" placeholder="Nueva Cantidad">
        </div>
    </div>
  
    <footer class="footerModal">
      <button id="cerrarModalUsaurio" class="botonFooterModalUsuario" onclick="cerrarModalAutor()"><i class="fa fa-times-circle"></i> Cerrar</button>
      <button id="agregarLibro" class="botonFooterModalUsuario" onclick="abrirModalConfirmarAgregar()"><i class="fa fa-plus"></i> Guardar Informacion</button>
    </footer>
  </section>
</div>

<script src="js_sistema/inventario.js"></script>