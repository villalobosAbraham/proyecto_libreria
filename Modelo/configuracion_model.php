<?php

    function conexion() {
        $servername = "localhost"; // Cambia esto según tu configuración
        $username_db = "root"; // Cambia esto según tu configuración
        $password_db = ""; // Cambia esto según tu configuración
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
                    conf_autores ON cat_librosautores.idautor = conf_autores.idautor";
        $stmt = $conexion->prepare($sql);

        // Ejecutar la consulta
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Verificar si se encontraron resultados
        if ($usuario = $resultado->fetch_assoc()) {
            // Si se encuentra un registro, el inicio de sesión es exitoso
            $resultado = array(
                "idUsuario" => $usuario["idusuario"],
                "idTipoUsuario" => $usuario["idtipousuario"],
            );
        } else {
            $resultado = false;
        }

        // Cerrar la conexión
        $stmt->close();
        $conexion->close();
        return $resultado;
    }

?>