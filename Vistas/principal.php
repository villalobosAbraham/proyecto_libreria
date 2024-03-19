<html lang="es">
    <head>
        <?php include '..\layouts\barra.php'; ?>
        <link rel="stylesheet" href="../Vistas/estilos/principal.css">
        <title>Principal</title>
    </head>
    <body>
        <main>
            <section class="buscador">
                <form action="#">
                    <input type="text" placeholder="Buscar libros">
                    <button type="submit">Buscar</button>
                </form>
            </section>
            <section class="libros-populares">
                <h2>Libros populares</h2>
                <ul>
                    <li>
                        <img src="../imagenes/libro1.jpg" alt="Libro 1">
                        <h3>Título del libro 1</h3>
                        <p>Autor del libro 1</p>
                    </li>
                    <li>
                        <img src="imagenes/libro2.jpg" alt="Libro 2">
                        <h3>Título del libro 2</h3>
                        <p>Autor del libro 2</p>
                    </li>
                    <li>
                        <img src="imagenes/libro3.jpg" alt="Libro 3">
                        <h3>Título del libro 3</h3>
                        <p>Autor del libro 3</p>
                    </li>
                </ul>
            </section>
            <section class="recomendaciones">
                <h2>Recomendaciones para ti</h2>
                <ul>
                    <li>
                        <img src="imagenes/libro4.jpg" alt="Libro 4">
                        <h3>Título del libro 4</h3>
                        <p>Autor del libro 4</p>
                    </li>
                    <li>
                        <img src="imagenes/libro5.jpg" alt="Libro 5">
                        <h3>Título del libro 5</h3>
                        <p>Autor del libro 5</p>
                    </li>
                    <li>
                        <img src="imagenes/libro6.jpg" alt="Libro 6">
                        <h3>Título del libro 6</h3>
                        <p>Autor del libro 6</p>
                    </li>
                </ul>
            </section>
        </main>
        <footer>
            <p>Copyright &copy; 2023 Librería digital</p>
        </footer>
    </body>
</html>
