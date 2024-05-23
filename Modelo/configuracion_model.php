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

    function CONFConsultarLibros() {
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

        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_all(MYSQLI_ASSOC); 

        $stmt->close();
        $conexion->close();
        return $resultado;
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

        $resultados = mysqli_query($conexion, $sql);

        if ($resultados) {
            $resultado = mysqli_fetch_assoc($resultados);
            return $resultado["cantidad"];

            // return $librosEnCarrito;
        } else {
            return false;
        }
    }

    function agregarLibroCarrito($datos) {
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

        $idUsuario = mysqli_real_escape_string($conexion, $idUsuario); 

        $sql = "SELECT 
        ven_carrodecompra.idlibro,
        SUM(ven_carrodecompra.cantidad) AS cantidad,
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
?>