<?php

    function conexion() {
        $servername = "localhost"; // Cambia esto según tu configuración
        $username_db = "abraham"; // Cambia esto según tu configuración
        $password_db = "Degea200"; // Cambia esto según tu configuración
        $dbname = "libreria_proyecto"; // Cambia esto según tu configuración
    
        // Crear conexión
        $conn = new mysqli($servername, $username_db, $password_db, $dbname);
    
        if ($conn->connect_error) {
            return array("success" => false, "message" => "Error de conexión a la base de datos: " . $conn->connect_error);
        }
        return $conn;
    }

    function CONFConsultarLibros() {
        // Consulta SQL para verificar las credenciales en la tabla log_usuarios
        $conexion = conexion();
        $sql = "SELECT 
                    cat_libros.idlibro, cat_libros.titulo, cat_libros.precio, cat_libros.descuento, cat_libros.iva,
                    cat_libros.idgeneroprincipal, cat_libros.fechapublicacion, cat_libros.portada, cat_libros.sinopsis,

                    conf_autores.idautor, conf_autores.nombre, conf_autores.apellidopaterno, 
                    conf_autores.apellidomaterno, conf_autores.fechanacimiento, conf_autores.idnacionalidad
                FROM 
                    cat_libros 
                LEFT JOIN 
                    cat_librosautores ON cat_libros.idlibro = cat_librosautores.idlibro
                LEFT JOIN 
                    conf_autores ON cat_librosautores.idautor = conf_autores.idautor
                LIMIT 3;";
        $stmt = $conexion->prepare($sql);

        // Ejecutar la consulta
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); // Obtener todos los resultados como un array asociativo

        // Cerrar la conexión
        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function VENAgregarLibroCarrito($datos) {
        $conexion = conexion();
        $idUsuario = $datos->idUsuario;
        $idLibro = $datos->idLibro;
        $cantidad = 1;
        $activo = 'S';

        $sql = "INSERT INTO ven_carrodecompra
                (idusuario, idlibro, cantidad, activo)
                VALUES
                ('$idUsuario', '$idLibro', '$cantidad', '$activo')";

        $stmt = $conexion->prepare($sql);

        return $stmt->execute(); 
    }

    function VENObtenerLibrosCarritoCompra($idUsuario) {
        $conexion = conexion();

        $idUsuario = mysqli_real_escape_string($conexion, $idUsuario); // Escapar el valor para evitar inyección SQL

        $sql = "SELECT 
        ven_carrodecompra.idlibro, ven_carrodecompra.cantidad,
        cat_libros.titulo, cat_libros.precio, cat_libros.descuento, cat_libros.iva, cat_libros.portada,
        GROUP_CONCAT(CONCAT(conf_autores.nombre, ' ', conf_autores.apellidopaterno, ' ', conf_autores.apellidomaterno) SEPARATOR '  ') AS autor,
        inv_inventariolibros.cantidad AS limiteLibro
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
            ven_carrodecompra.idlibro
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
?>