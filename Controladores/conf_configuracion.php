<?php
session_start();

require_once '../Modelo/configuracion_model.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $datos = json_decode(file_get_contents('php://input'));
    if (isset($datos->accion)) {
        $accion = $datos->accion;
        
        switch ($accion) {
            case "consultarLibros":
                $resultado = CONFConsultarLibros();  

                echo json_encode($resultado);
                break;
            case "VENAgregarLibroCarrito":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $resultado = VENAgregarLibroCarrito($datos);  

                echo json_encode($resultado);
                break;
            case "VENObtenerLibrosCarritoCompra":
                $resultado = VENObtenerLibrosCarritoCompra($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "CONFComprobarUsuario":
                $resultado = isset($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            default:
                echo json_encode(array("error" => "Acción no válida"));
        }
    } else {
        echo json_encode(array("error" => "No se proporcionó ninguna acción"));
    }
}