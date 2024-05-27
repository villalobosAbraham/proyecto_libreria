<html lang="es">
    <head>
        <?php include '../layouts/barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/principal.css">
        <title>Principal</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    </head>
    <body>
        <main>
            <section class="buscador">
                <form action="#">
                    <input type="text" placeholder="Buscar libros">
                    <button type="submit" onclick="obtenerLibrosPopulares();">Buscar</button>
                </form>
            </section>
            <div id="busqueda">
                <section class="libros-busqueda">
                    <h2 id="tituloBusqueda"></h2>
                    <ul id="listaBusqueda">

                    </ul>
                </section>
            </div>
            <div id="secciones">
                <section class="libros-populares">
                    <h2>Libros populares</h2>
                    <ul id="listaPopulares">

                    </ul>
                </section>
                <section class="recomendaciones">
                    <h2>Recomendaciones para ti</h2>
                    <ul>
                        <li>
                            <h3>Título del libro 4</h3>
                            <p>Autor del libro 4</p>
                        </li>
                        <li>
                            <h3>Título del libro 5</h3>
                            <p>Autor del libro 5</p>
                        </li>
                        <li>
                            <h3>Título del libro 6</h3>
                            <p>Autor del libro 6</p>
                        </li>
                    </ul>
                </section>
            </div>
        </main>
        <footer>
            <p>Copyright &copy; 2024 Librería digital</p>
        </footer>
    </body>
    <div id="myModal" class="modal">
        <div id="modalDetallesLibro" class="modal-content">
            <span class="close">&times;</span>
            <h1 id="tituloModal"></h1>
            <div id="divDetallesLibro">
                <div id="divImagenLibroDetalles">
                    <img id="imagenLibroDetalles">
                </div>    
                <h3 id="autoresLibro"></h3>
                <h3 id="añoPublicacionLibro"></h3>
                <h3 id="generoLibroDetalles"></h3>
                <h3 id="cantidadPaginas"></h3>
                <h3 id="idiomaLibro"></h3>
                <h3 id="editorialLibro"></h3>
            </div>
            <div id="divSinopsisLibro">
                <p id="pSinopsisLibro"></p>
            </div>

        </div>
    </div>
</html>

<script src="../Vistas/js/principal.js"></script>
