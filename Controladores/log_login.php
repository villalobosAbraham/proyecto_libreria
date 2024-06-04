<?php
session_start(); 

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

                $datos->idTipoUsuario = 1;
                $datos->activo = "S";
                $datos->fechaActual = date('Y-m-d');

                $comprobarExistenciaUsuario = login($correo, $contraseña);
                if (!$comprobarExistenciaUsuario) {
                    $resultado = registro($datos);
                    echo json_encode($resultado);
                } else {
                    echo json_encode("Usuario Existente");
                }
                break;
            case "CONFComprobarCarritoCantidad":
                $resultado = CONFComprobarCarritoCantidad($_SESSION["idUsuario"]);
                echo json_encode($resultado);
                break;
            case "CONFObtenerUsuarioBarra":
                $resultado = CONFObtenerUsuarioBarra($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "CONFGuardarInformacionUsuarioModal":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $resultado = CONFGuardarInformacionUsuarioModal($datos);

                echo json_encode($resultado);
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