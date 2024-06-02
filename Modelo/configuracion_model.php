<?php

    function conexion() {
        $servername = "localhost"; 
        $username_db = "abraham"; 
        $password_db = "Degea200"; 
        $dbname = "libreria_proyecto"; 
    
        $conn = new mysqli($servername, $username_db, $password_db, $dbname);
    
        if ($conn->connect_error) {
            return array("success" => false, "message" => "Error de conexión a la base de datos: " . $conn->connect_error);
        }
        return $conn;
    }

    function obtenerLibrosArrayIds($listaLibros) {
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
                WHERE 
                    cat_libros.idlibro IN ($listaLibros)
                GROUP BY
                    cat_libros.idlibro";
        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function obtenerLibrosArrayGenero($listaLibros) {
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
                WHERE 
                    cat_libros.idgeneroprincipal IN ($listaLibros)
                GROUP BY
                    cat_libros.idlibro
                ORDER BY 
                    RAND()    
                LIMIT 10
                ";
        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function obtenerListaIdsLibrosPopulares() {
        $conexion = conexion();

        $sql = "SELECT idlibro
                FROM (
                    SELECT idlibro, fecha
                    FROM inv_visualizaciones
                    ORDER BY fecha DESC
                ) as subquery
                GROUP BY idlibro
                ORDER BY MAX(fecha) DESC
                LIMIT 10
        ";

        $resultados = $conexion->query($sql);

        // Crear un array para almacenar los idlibro
        $idLibros = array();

        // Verificar si hay resultados
        if ($resultados->num_rows > 0) {
            // Recorrer los resultados y almacenarlos en el array
            while($row = $resultados->fetch_assoc()) {
                $idLibros[] = $row['idlibro'];
            }
        }

        // Cerrar la conexión
        $conexion->close();

        // Devolver el array de idlibros
        return $idLibros;
    }

    function obtenerListaIdsLibrosRecomendados() {
        $conexion = conexion();

        $sql = "SELECT DISTINCT 
                    cat_libros.idgeneroprincipal
                FROM
                    inv_visualizaciones
                JOIN
                    cat_libros ON inv_visualizaciones.idlibro = cat_libros.idlibro
                LIMIT 5;
        ";

        $resultados = $conexion->query($sql);

        // Crear un array para almacenar los idlibro
        $idLibros = array();

        // Verificar si hay resultados
        if ($resultados->num_rows > 0) {
            // Recorrer los resultados y almacenarlos en el array
            while($row = $resultados->fetch_assoc()) {
                $idLibros[] = $row['idgeneroprincipal'];
            }
        }

        // Cerrar la conexión
        $conexion->close();

        // Devolver el array de idlibros
        return $idLibros;
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
                    MAX(conf_genero.idgenero) AS idgenero,
                    MAX(conf_genero.genero) AS genero,
                    COUNT(inv_inventariolibros.cantidad) AS cantidad
                FROM
                    conf_genero
                JOIN 
                    cat_libros ON conf_genero.idgenero = cat_libros.idgeneroprincipal
                LEFT JOIN 
                    inv_inventariolibros ON cat_libros.idlibro = inv_inventariolibros.idlibro 
                WHERE
                    conf_genero.activo = 'S'
                GROUP BY
                    idgenero  
                ";

        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        return $resultado;
    }

    function CONFFiltrarLibros($datos) {
        $conexion = conexion();
        $generos = $datos->generos;
        $libro = $datos->libro;
        $libro = strtolower($libro); // Convierte a minúsculas para evitar problemas de sensibilidad de mayúsculas y minúsculas

        // Comienza la consulta base
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
        JOIN 
            conf_genero ON cat_libros.idgeneroprincipal = conf_genero.idgenero
        JOIN 
            cat_idioma ON cat_libros.ididioma = cat_idioma.ididioma
        JOIN 
            cat_editoriales ON cat_libros.ideditorial = cat_editoriales.ideditorial
        LEFT JOIN
            inv_inventariolibros ON cat_libros.idlibro = inv_inventariolibros.idlibro
        JOIN 
            cat_librosautores ON cat_libros.idlibro = cat_librosautores.idlibro
        JOIN 
            conf_autores ON cat_librosautores.idautor = conf_autores.idautor
        ";

        if(empty($libro) && empty($generos)) {

        } else if (!empty($libro) && !empty($generos)) {
            $sql .= "WHERE cat_libros.idgeneroprincipal IN ($generos)
            OR (LOWER(cat_libros.titulo) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.nombre) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.apellidopaterno) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.apellidomaterno) LIKE LOWER('%$libro%'))";
        } else if(empty($libro)) {
            $sql .= "WHERE cat_libros.idgeneroprincipal IN ($generos)";
        } else if(empty($generos)) {
            $sql .= "WHERE LOWER(cat_libros.titulo) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.nombre) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.apellidopaterno) LIKE LOWER('%$libro%') 
                OR LOWER(conf_autores.apellidomaterno) LIKE LOWER('%$libro%')";
        }

        // Finaliza la consulta
        $sql .= "
        GROUP BY
            cat_libros.idlibro";

        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
    }


    function comprobarDiferenciaCarritoInventario($idUsuario) {
        $conexion = conexion();

        $sql = "SELECT
                    ven_carrodecompra.idusuario, ven_carrodecompra.idlibro, ven_carrodecompra.cantidad,

                    inv_inventariolibros.cantidad AS stock
                FROM
                    ven_carrodecompra
                LEFT JOIN 
                    inv_inventariolibros ON ven_carrodecompra.idlibro = inv_inventariolibros.idlibro
                WHERE
                    ven_carrodecompra.cantidad > inv_inventariolibros.cantidad
                ";
        $resultado = mysqli_query($conexion, $sql);

        if (mysqli_num_rows($resultado) < 1) {
            return true;
        } else {
            return false;
        }
    }

    function registrarVentaMaestra($datos) {
        $conexion = conexion();

        $sql = "INSERT INTO
                    ven_ventam
                    (fecha, hora, idusuariocompra, idvendedor, importe, descuento, iva, total, idestadoentrega, idordenpaypal)
                VALUES
                    ('$datos->fecha', '$datos->hora', '$datos->idUsuario', '0', '$datos->importeMaestro', '$datos->descuentoMaestro', '$datos->ivaMaestro', '$datos->totalMaestro', '1', '$datos->idOrdenPaypal')
                ";
        $stmt = $conexion->prepare($sql);

        return $stmt->execute(); 
    }

    function obtenerIdVentaMaestra($datos) {
        $conexion = conexion();

        $sql = "SELECT
                    idventa
                FROM
                    ven_ventam
                WHERE
                    fecha = '$datos->fecha' AND
                    hora = '$datos->hora' AND
                    idusuariocompra = '$datos->idUsuario'
        ";

        // Ejecutar la consulta
        $resultados = mysqli_query($conexion, $sql);

        // Obtener la fila resultante
        $resultado = mysqli_fetch_assoc($resultados);

        // Verificar si la cantidad es válida
        return $resultado['idventa'];
    }

    function registrarVentasDetalle($idVenta, $datosCarrito) {
        $conexion = conexion();

        $sql = "INSERT INTO 
                    ven_ventad
                    (idventa, idlibro, cantidad, precio, descuento, iva, total)
                VALUES
                    (?,?,?,?,?,?,?)
                ";

        $stmt = $conexion->prepare($sql);
        foreach ($datosCarrito as $libro) {
            $idLibro = $libro["idlibro"];
            $cantidad = $libro["cantidad"];
            $precio = $libro["precio"];
            $descuento = $libro["descuento"];
            $iva = $libro["iva"];
            $total = ($precio - $descuento + $iva) * $cantidad;
            
            $stmt->bind_param("iiidddd", $idVenta, $idLibro, $cantidad, $precio, $descuento, $iva, $total);
            if (!$stmt->execute()) {
                $stmt->close();
                $conexion->close();
                return false;
            } 
        }

        $stmt->close();
        $conexion->close();
        return true;
    }

    function salidaInventarioVenta($datosCarrito) {
        $conexion = conexion();

        $sql = "UPDATE
                    inv_inventariolibros
                SET
                    cantidad = cantidad - ?
                WHERE
                    idlibro = ?
                ";

        $stmt = $conexion->prepare($sql);
        foreach ($datosCarrito as $libro) {
            $idLibro = $libro["idlibro"];
            $cantidad = $libro["cantidad"];
            
            $stmt->bind_param("ii", $cantidad, $idLibro);
            if (!$stmt->execute()) {
                $stmt->close();
                $conexion->close();
                return false;
            } 
        }

        $stmt->close();
        $conexion->close();
        return true;
    }

    function CONFObtenerComprasUsuario($idUsuario) {
        $conexion = conexion();

        $sql = "SELECT
                    ven_ventam.idventa, ven_ventam.fecha, ven_ventam.total, ven_ventam.idusuariocompra, ven_ventam.idvendedor, ven_ventam.idestadoentrega, ven_ventam.idordenpaypal,

                    log_usuarios.nombre, log_usuarios.apellidopaterno, log_usuarios.apellidomaterno,

                    conf_estadoentrega.estado
                FROM
                    ven_ventam
                LEFT JOIN
                    log_usuarios ON ven_ventam.idusuariocompra = log_usuarios.idusuario
                LEFT JOIN
                    conf_estadoentrega ON ven_ventam.idestadoentrega = conf_estadoentrega.idestadoentrega
                WHERE
                    ven_ventam.idusuariocompra = '$idUsuario'
                ";
        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        return $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    }

    function CONFObtenerLibros() {
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
                    MAX(cat_libros.activo) AS activo,

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
        $stmt = $conexion->prepare($sql);

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
    }
?>