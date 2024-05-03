<html lang="es">
    <head>
        <?php include '../layouts/barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/principal.css">
        <title>Principal</title>
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
</html>

<script src="../Vistas/js/principal.js"></script>
