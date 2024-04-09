<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página de libro</title>
    <link rel="stylesheet" href="../estilos/descripcion.css">
</head>
<body>
    <header>
        <img src="imagenes/logo.png" alt="Logo">
        <h1>Librería digital</h1>
    </header>
    <main>
        <section class="libro">
            <div class="imagen">
                <img src="../imagenes/libro4.jpg" alt="Portada del libro">
            </div>
            <div class="informacion">
                <h2>Título del libro</h2>
                <p>Autor del libro</p>
                <p>Precio: $Precio</p>
                <p>Categoría: Categoría del libro</p>
                <p>Descripción del libro</p>
                <button type="button">Comprar</button>
            </div>
        </section>
        <section class="libros-similares">
            <h2>Libros similares</h2>
            <ul>
                <li>
                    <img src="imagenes/libro5.jpg" alt="Libro 1">
                    <h3>Título del libro 1</h3>
                    <p>Autor del libro 1</p>
                </li>
                <li>
                    <img src="imagenes/libro6.jpg" alt="Libro 2">
                    <h3>Título del libro 2</h3>
                    <p>Autor del libro 2</p>
                </li>
                <li>
                    <img src="imagenes/libro2.jpg" alt="Libro 3">
                    <h3>Título del libro 3</h3>
                    <p>Autor del libro 3</p>
                </li>
            </ul>
        </section>
    </main>
    <button class="button"><a href="principal.php">regresar</a></button>
    <footer>
        <p>Copyright &copy; 2024 Librería digital</p>
    </footer>
</body>
</html>