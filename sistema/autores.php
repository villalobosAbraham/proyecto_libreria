<html lang="es">
    <head>
        <?php include 'layouts/barra_sistema.php'; ?>
        <link rel="stylesheet" href="estilos/autores.css">
        <title>Catalogo Autores</title>
    </head>
    <br>
    <body>
        <header>
            <h1>Autores</h1>
        </header>
        <main>
            <div class="row">
                <button class="botonPrimario" onclick="abrirModalAgregarAutor();">Agregar Autor <i class="fa fa-plus"></i></button>
                <button class="botonPrimario" onclick="abrirModalConfirmarDeshabilitar();">Inhabilitar Autor <i class="fa fa-ban"></i></button>
                <button class="botonPrimario" onclick="abrirModalConfirmarHabilitar();">Habilitar Autor <i class="fa fa-check"></i></button>
            </div>
            <div style="width: 95%; margin-left: 1%;">
                <table id="tablaAutores" class="tablaAutores">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha Nacimiento</th>
                            <th>Nacionalidad</th>
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
<div id="modalAutor" class="modalAutor" style="display: none;">
  <section id="contenidoModalAutor" class="contenidoModalAutor">
    <div class="headerModal">
      <h1 id="tituloModalAutor">Agregar Autor</h1>
    </div>
    <div class="bodyModal">
      <div class="row">
        <label class="label-control" >Titulo del Libro: </label>
        <input type="text" id="nombreLibro" class="input-control" placeholder="Titulo">

        <label class="label-control">Autor: </label>
        <select id="autorLibro" class="input-control">
            <option value="-1">Seleccionar Autor</option>
        </select>
      </div>

      <div class="row">
        <label class="label-control">Género: </label>
        <select id="generoLibro" class="input-control">
            <option value="-1">Seleccionar Género</option>
        </select>
        <label class="label-control">Editorial: </label>
        <select id="editorialLibro" class="input-control">
            <option value="-1">Seleccionar Editorial</option>
        </select>
      </div>

      <div class="row">
        <label class="label-control">Idioma: </label>
        <select id="idiomaLibro" class="input-control">
            <option value="-1">Seleccionar Idioma</option>
        </select>
      </div>
    </div>
  
    <footer class="footerModal">
      <button id="cerrarModalUsaurio" class="botonFooterModalUsuario" onclick="cerrarModalLibro()"><i class="fa fa-times-circle"></i> Cerrar</button>
      <button id="agregarLibro" class="botonFooterModalUsuario" onclick="abrirModalConfirmarAgregar()"><i class="fa fa-plus"></i> Guardar Informacion</button>
    </footer>
  </section>
</div>

<script src="js_sistema/autores.js"></script>