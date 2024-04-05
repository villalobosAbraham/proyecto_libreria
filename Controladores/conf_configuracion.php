<?php
session_start(); // Iniciar la sesión si no está iniciada

require_once '../Modelo/configuracion_model.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $datos = json_decode(file_get_contents('php://input'));
    if (isset($datos->accion)) {
        $accion = $datos->accion;
        
        switch ($accion) {
            case "consultarLibros":
                $resultado = CONFConsultarLibros();  
                if ($resultado) {
                    // Guardar el ID de usuario en la variable de sesión
                    $_SESSION["idUsuario"] = $resultado["idUsuario"];
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