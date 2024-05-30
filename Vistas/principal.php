<html lang="es">
    <head>
        <?php include '../layouts/barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/principal.css">
        <title>Principal</title>
    </head>
    <body>
        <main id="main">
            <section class="buscador">
                <form action="#">
                    <input id="inputBuscarLibro" type="search" placeholder="Buscar libros">
                    <button onclick="filtrarLibros();">Buscar <i class="fa fa-search"></i></button>
                </form>
            </section>
            <div id="divContenedorFiltros">
                <h3 id="h2Filtros">Filtro Genero </h3>
                <ul id="listaFiltros"></ul>
            </div>
            <div id="divContenedorSecciones">
                <div id="busqueda">
                    <section class="seccionLibros">
                        <h2>Libros Filtrados</h2>
                        <ul id="listaBusqueda" class="listaLibros"></ul>
                        <ul id="listaBusquedaPaginacion" class="pagination"></ul>
                    </section>
                </div>
                <div id="secciones">
                    <section class="seccionLibros">
                        <h2>Libros populares</h2>
                        <ul id="listaPopulares" class="listaLibros"></ul>
                        <ul id="listaPopularesPaginacion" class="pagination"></ul>
                    </section>
                    <br>
                    <section class="seccionLibros">
                        <h2>Recomendaciones para ti</h2>
                        <ul id="listaRecomendaciones" class="listaLibros"></ul>
                        <ul id="listaRecomendacionesPaginacion" class="pagination"></ul>
                    </section>
                </div>
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

<script src="/Vistas/js/principal.js"></script>