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
            case "VENAgregarAumentarLibroCarrito":
                $datos->idUsuario = $_SESSION["idUsuario"];
                
                $cantidadLibros = comprobarExistenciaLibroCarrito($datos);
                if ($cantidadLibros >= 1) {
                    $datos->cantidad = $cantidadLibros + $datos->aumento;
                    echo json_encode(actualizarLibroCarritoCompra($datos));
                } else {
                    echo json_encode(agregarLibroCarrito($datos));
                }

                break;
            case "VENObtenerLibrosCarritoCompra":
                $resultado = VENObtenerLibrosCarritoCompra($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "VENLimpiarCarritoCompra":
                $resultado = VENLimpiarCarritoCompra($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "VENBorrarLibroCarrito":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $resultado = VENBorrarLibroCarrito($datos);

                echo json_encode($resultado);
                break;
            case "VENActualizarCantidadCarrito":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $resultado = VENActualizarCantidadCarrito($datos);

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