<?php
session_start(); // Iniciar la sesión si no está iniciada

require_once '../Modelo/login_model.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $datos = json_decode(file_get_contents('php://input'));
    if (isset($datos->accion)) {
        $accion = $datos->accion;
        
        switch ($accion) {
            case "login":
                if(isset($datos->correo) && isset($datos->contraseña)) {
                    $correo = $datos->correo;
                    $contraseña = $datos->contraseña;
                    $resultado = login($correo, $contraseña);
                    if ($resultado) {
                        // Guardar el ID de usuario en la variable de sesión
                        $_SESSION["idUsuario"] = $resultado["idUsuario"];
                    }
                    echo json_encode($resultado);
                } else {
                    echo json_encode(false);
                }
                break;
            case "registro":
                $correo = $datos->correo;
                $contraseña = $datos->contraseña;
                $nombre = $datos->nombre;
                $apellidoPaterno = $datos->apellidoPaterno;
                $apellidoMaterno = $datos->apellidoMaterno;
                $idTipoUsuario = 1;

                $fechaActual = date('Y-m-d');

                $activo = "S";
                $comprobarExistenciaUsuario = login($correo, $contraseña);
                if (!$comprobarExistenciaUsuario) {
                    $resultado = registro($correo, $contraseña, $nombre, $apellidoPaterno, $apellidoMaterno, $idTipoUsuario, $fechaActual, $activo);
                    $_SESSION["idUsuario"] = $resultado["idUsuario"];
                    echo json_encode($resultado);
                } else {
                    echo json_encode(false);
                }
                break;
            case "CONFCerrarSesion":
                if (session_unset() && session_destroy()) {
                    $resultado = true;
                } else {
                    $resultado == false;
                }
                
                echo json_encode($resultado);
                break;
            default:
                echo json_encode(array("error" => "Acción no válida"));
        }
    } else {
        echo json_encode(array("error" => "No se proporcionó ninguna acción"));
    }
}
?>