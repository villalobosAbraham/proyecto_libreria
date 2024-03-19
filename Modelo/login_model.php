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

    function login($correo, $contraseña) {
        // Consulta SQL para verificar las credenciales en la tabla log_usuarios
        $conexion = conexion();
        $sql = "SELECT 
                    idusuario, idtipousuario 
                FROM log_usuarios 
                WHERE email = ? AND contraseña = ?";
                //  WHERE nombre = ? AND contraseña = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $correo, $contraseña);

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

    function registro($username, $password) {
        $conexion = conexion();

        // Consulta SQL para verificar las credenciales en la tabla log_usuarios
        $sql = "INSERT INTO usuario 
                (nombre, contraseña)
                VALUES
                (?,?)
                ";            
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $username, $password);

        if ($stmt->execute()) {
            // Si se encuentra un registro, el inicio de sesión es exitoso
            $resultado = array(
                "success" => true, 
                "message" => "Registro Exitoso", 
                "user_id" => 1
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