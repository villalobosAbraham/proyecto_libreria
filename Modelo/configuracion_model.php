<?php

    function conexion() {
        $servername = "localhost"; 
        $username_db = "root"; 
        $password_db = ""; 
        $dbname = "libreria_proyecto"; 
    
        $conn = new mysqli($servername, $username_db, $password_db, $dbname);
    
        if ($conn->connect_error) {
            return array("success" => false, "message" => "Error de conexión a la base de datos: " . $conn->connect_error);
        }
        return $conn;
    }

    function CONFConsultarLibros() {
        $conexion = conexion();
        $sql = "SELECT 
                    MAX(cat_libros.idlibro) AS idlibro,
                    MAX(cat_libros.titulo) AS titulo,
                    MAX(cat_libros.precio) AS precio,
                    MAX(cat_libros.descuento) AS descuento,
                    MAX(cat_libros.iva) AS iva,
                    MAX(cat_libros.idgeneroprincipal) AS idgeneroprincipal,
                    MAX(cat_libros.fechapublicacion) AS fechapublicacion,
                    MAX(cat_libros.portada) AS portada,
                    MAX(cat_libros.sinopsis) AS sinopsis,
                    MAX(cat_libros.paginas) AS paginas,

                    MAX(conf_genero.genero) AS genero,

                    MAX(cat_idioma.idioma) AS idioma,

                    MAX(cat_editoriales.editorial) AS editorial,

                    GROUP_CONCAT(CONCAT(conf_autores.nombre, ' ', conf_autores.apellidopaterno, ' ', conf_autores.apellidomaterno) SEPARATOR '  ') AS autores,
                    MAX(inv_inventariolibros.cantidad) AS limiteLibro
                FROM 
                    cat_libros 
                LEFT JOIN 
                    conf_genero ON cat_libros.idgeneroprincipal = conf_genero.idgenero
                LEFT JOIN 
                    cat_idioma ON cat_libros.ididioma = cat_idioma.ididioma
                LEFT JOIN 
                    cat_editoriales ON cat_libros.ideditorial = cat_editoriales.ideditorial
                LEFT JOIN
                    inv_inventariolibros ON cat_libros.idlibro = inv_inventariolibros.idlibro
                LEFT JOIN 
                    cat_librosautores ON cat_libros.idlibro = cat_librosautores.idlibro
                JOIN 
                    conf_autores ON cat_librosautores.idautor = conf_autores.idautor
                GROUP BY
                    cat_libros.idlibro";
                // LIMIT 10;";
        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function obtenerListaLibrosPopulares() {
        $conexion = conexion();

        $sql = "SELECT DISTINCT 
                    idlibro
                FROM
                    inv_visualizaciones
                ORDER BY 
                    fecha DESC
                LIMIT 10
        ";
    }

    function CONFObtenerLibrosPopulares() {
        $conexion = conexion();

        $sql = "SELECT

        ";


        return true;
    }

    function comprobarExistenciaLibroCarrito($datos) {
        $conexion = conexion();

        $idUsuario = $datos->idUsuario;
        $idLibro = $datos->idLibro;

        $sql = "SELECT
                    cantidad
                FROM
                    ven_carrodecompra
                WHERE
                    idusuario = '$idUsuario' AND
                    idlibro = '$idLibro'
        ";

        // Ejecutar la consulta
        $resultados = mysqli_query($conexion, $sql);

        // Verificar si la consulta fue exitosa
        if (!$resultados) {
            throw new Exception('Error en la ejecución de la consulta: ' . mysqli_error($conexion));
        }

        // Obtener la fila resultante
        $resultado = mysqli_fetch_assoc($resultados);

        // Verificar si se obtuvo una fila
        if ($resultado === null) {
            return 0;
        }

        // Verificar si la cantidad es válida
        $cantidad = $resultado['cantidad'];
        if ($cantidad === null || $cantidad <= 0) {
            return 0;
        }

        // Devolver la cantidad
        return $cantidad;

        // return $librosEnCarrito;
    }

    function agregarLibroCarrito($datos) {
        $conexion = conexion();
        $idUsuario = $datos->idUsuario;
        $idLibro = $datos->idLibro;
        $cantidad = 1;
        $activo = 'S';

        $sql = "INSERT INTO 
                    ven_carrodecompra
                (idusuario, idlibro, cantidad, activo)
                VALUES
                ('$idUsuario', '$idLibro', '$cantidad', '$activo')";

        $stmt = $conexion->prepare($sql);

        return $stmt->execute(); 
    }

    function VENObtenerLibrosCarritoCompra($idUsuario) {
        $conexion = conexion();

        $idUsuario = mysqli_real_escape_string($conexion, $idUsuario); 

        $sql = "SELECT 
        ven_carrodecompra.idlibro,
        MAX(ven_carrodecompra.cantidad) AS cantidad,
        MAX(cat_libros.titulo) AS titulo,
        MAX(cat_libros.precio) AS precio,
        MAX(cat_libros.descuento) AS descuento,
        MAX(cat_libros.iva) AS iva,
        MAX(cat_libros.portada) AS portada,
        GROUP_CONCAT(CONCAT(conf_autores.nombre, ' ', conf_autores.apellidopaterno, ' ', conf_autores.apellidomaterno) SEPARATOR '  ') AS autor,
        MAX(inv_inventariolibros.cantidad) AS limiteLibro
        FROM
            ven_carrodecompra
        LEFT JOIN
            cat_libros ON ven_carrodecompra.idlibro = cat_libros.idlibro
        LEFT JOIN
            inv_inventariolibros ON ven_carrodecompra.idlibro = inv_inventariolibros.idlibro
        LEFT JOIN
            cat_librosautores ON ven_carrodecompra.idlibro = cat_librosautores.idlibro
        LEFT JOIN
            conf_autores ON cat_librosautores.idautor = conf_autores.idautor
        WHERE
            ven_carrodecompra.idusuario = '$idUsuario'
        GROUP BY
            ven_carrodecompra.idlibro;
        ";

        $resultado = mysqli_query($conexion, $sql);

        if ($resultado) {
            $librosEnCarrito = array();

            while ($fila = mysqli_fetch_assoc($resultado)) {
                $librosEnCarrito[] = $fila;
            }

            return $librosEnCarrito;
        } else {
            return false;
        }
    }

    function actualizarLibroCarritoCompra($datos) {
        $conexion = conexion();
        
        $sql ="UPDATE 
            ven_carrodecompra
        SET
            cantidad = '$datos->cantidad'
        WHERE
            idusuario = '$datos->idUsuario' AND
            idlibro = '$datos->idLibro'
        ";

        return $conexion->query($sql);
    }

    function VENLimpiarCarritoCompra($idUsuario) {
        $conexion = conexion();

        $sql = "DELETE
        FROM
            ven_carrodecompra
        WHERE
            idusuario = '$idUsuario'
        ";

        return $conexion->query($sql);
    }

    function VENBorrarLibroCarrito($datos) {
        $conexion = conexion();

        $sql = "DELETE
        FROM
            ven_carrodecompra
        WHERE
            idusuario = '$datos->idUsuario' AND
            idlibro = '$datos->idLibro'
        ";

        return $conexion->query($sql);
    }

    function VENActualizarCantidadCarrito($datos) {
        $conexion = conexion();

        $sql = "UPDATE
            ven_carrodecompra
        SET
            cantidad = '$datos->cantidad'
        WHERE
            idusuario = '$datos->idUsuario' AND 
            idlibro = '$datos->idLibro'
        ";

        return $conexion->query($sql);
    }

    function INVRegistrarVisualizacion($datos) {
        $conexion = conexion();
        $idUsuario = $datos->idUsuario;
        $idLibro = $datos->idLibro;
        $fecha = $datos->fecha;

        $sql = "INSERT INTO 
                    inv_visualizaciones
                (idusuario, idlibro, fecha)
                VALUES
                ('$idUsuario', '$idLibro', '$fecha')";

        $stmt = $conexion->prepare($sql);

        return $stmt->execute(); 
    }

    function CONFObtenerGenerosFiltros() {
        $conexion = conexion();

        $sql = "SELECT
                    idgenero, genero
                FROM
                    conf_genero
                WHERE
                    activo = 'S'   
                ";

        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        return $resultado;
    }
?>