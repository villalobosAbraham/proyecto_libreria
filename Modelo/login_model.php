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

    function registro($correo, $contraseña, $nombre, $apellidoPaterno, $apellidoMaterno, $idTipoUsuario, $fechaActual, $activo) {
        $conexion = conexion();

        $sql = "INSERT INTO log_usuarios 
                (email, contraseña, nombre, apellidopaterno, apellidomaterno, idtipousuario, fecharegistro, activo)
                VALUES
                (?,?,?,?,?,?,?,?)
                ";            
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("sssssiss", $correo, $contraseña, $nombre, $apellidoPaterno, $apellidoMaterno, $idTipoUsuario, $fechaActual, $activo);

        if ($stmt->execute()) {
            $resultado = array(
                "success" => true, 
                "message" => "Registro Exitoso", 
                "user_id" => 1
            );
        } else {
            $resultado = false;
        }

        $stmt->close();
        $conexion->close();
        return $resultado;
    }
?>