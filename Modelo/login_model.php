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

    function login($correo, $contraseña) {
        $conexion = conexion();
        $sql = "SELECT 
                    idusuario, idtipousuario 
                FROM log_usuarios 
                WHERE email = ? AND contraseña = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $correo, $contraseña);

        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($usuario = $resultado->fetch_assoc()) {
            $resultado = array(
                "idUsuario" => $usuario["idusuario"],
                "idTipoUsuario" => $usuario["idtipousuario"],
            );
        } else {
            $resultado = false;
        }

        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function registro($datos) {
        $conexion = conexion();

        $sql = "INSERT INTO log_usuarios 
                (email, contraseña, nombre, apellidopaterno, apellidomaterno, idtipousuario, fecharegistro, telefono, fechanacimiento, activo)
                VALUES
                (?,?,?,?,?,?,?,?,?,?)
                ";            
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ssssssssss", $datos->correo, $datos->contraseña, $datos->nombre, $datos->apellidoPaterno, $datos->apellidoMaterno, $datos->idTipoUsuario, $datos->fechaActual, $datos->telefono, $datos->fechaNacimiento, $datos->activo);

        if ($stmt->execute()) {
            $resultado = true;
        } else {
            $resultado = "Fallo al Registrar Usuario";
        }

        $stmt->close();
        $conexion->close();
        return $resultado;
    }

    function CONFComprobarCarrito($idUsuario) {
        $conexion = conexion();

        $sql = "SELECT 
                    SUM(cantidad) AS total
                FROM
                    ven_carrodecompra
                WHERE
                    idusuario = '$idUsuario'
        ";

        $resultado = $conexion->query($sql);
        $fila = $resultado->fetch_assoc();
        $total = $fila['total'];

        return $total;
    }

    function CONFObtenerUsuarioBarra($idUsuario) {
        $conexion = conexion();

        $sql = "SELECT
                    nombre, apellidopaterno, apellidomaterno, email, telefono, fechanacimiento
                FROM
                    log_usuarios
                WHERE
                    idusuario = '$idUsuario'
                ";

        $resultados = mysqli_query($conexion, $sql);

        return mysqli_fetch_assoc($resultados);
    }

    function CONFGuardarInformacionUsuarioModal($datos) {
        $conexion = conexion();

        $sql = "UPDATE
                    log_usuarios
                SET
                    email = '$datos->correo',
                    nombre = '$datos->nombre',
                    apellidomaterno = '$datos->apellidoMaterno',
                    apellidopaterno = '$datos->apellidoPaterno',
                    telefono = '$datos->telefono',
                    fechanacimiento = '$datos->fechaNacimiento'
                WHERE
                    idusuario = '$datos->idUsuario'
                ";

        return $conexion->query($sql);
    }
?>