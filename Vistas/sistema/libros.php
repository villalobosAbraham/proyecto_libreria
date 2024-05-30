<html lang="es">
    <head>
        <?php include 'layouts/barra_sistema.php'; ?>
        <link rel="stylesheet" href="estilos/libros.css">
        <title>Catalogo Libros</title>
    </head>
    <br>
    <body>
        <header>
            <h1>Libros</h1>
        </header>
        <br>
        <main>
            <div class="row">
                <button class="botonPrimario" onclick="abrirModalAgregarCarrito();">Agregar Libro </button>
                <button id="inhabilitarLibro" class="botonPrimario">Inhabilitar Libro</button>
            </div>
            <div style="width: 95%; margin-left: 1%;">
                <table id="tablaLibros" class="tablaLibros">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>Genero</th>
                            <th>Idioma</th>
                            <th>Editoria</th>
                            <th>Fecha Publicacion</th>
                            <th>Paginas</th>
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
<div id="modalLibro" class="modalLibro" style="display: none;">
  <section id="contenidoModalLibro" class="contenidoModalLibro">
    <div class="headerModal">
      <h1 id="tituloModalLibro">Agregar Libro</h1>
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
        <label class="label-control" id="">Genero: </label>
        <select id="generoLibro" class="input-control">
            <option value="-1">Seleccionar Genero</option>
        </select>
        <label class="label-control" id="">Editorial: </label>
        <select id="editorialLibro" class="input-control">
            <option value="-1">Seleccionar Editorial</option>
            <option value="">pene</option>
        </select>
      </div>

      <div class="row">
        <label class="label-control" id="">Idioma: </label>
        <select id="idiomaLibro" class="input-control">
            <option value="-1">Seleccionar Idioma</option>
        </select>
        <label class="label-control" id="">Paginas </label>
        <input type="text" id="paginasLibro" class="input-control" placeholder="Paginas ">
      </div>

      <div class="row">
        <label class="label-control" id="">Fecha Publicacion: </label>
        <input type="date" id="fechaLibro" class="input-control">
      </div>
    </div>
  
    <footer class="footerModal">
      <button id="cerrarModalUsaurio" class="botonFooterModalUsuario" onclick="cerrarModalLibro()"><i class="fa fa-times-circle"></i> Cerrar</button>
      <button id="agregarLibro" class="botonFooterModalUsuario" onclick="agregarLibro()"><i class="fa fa-plus"></i> Guardar Informacion</button>
    </footer>
  </section>
</div>

<script src="js_sistema/libros.js"></script>