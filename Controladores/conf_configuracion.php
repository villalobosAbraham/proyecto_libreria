<?php
session_start();

require_once '../Modelo/configuracion_model.php';
date_default_timezone_set('America/Mazatlan'); // Cambia esto por tu zona horaria
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $datos = json_decode(file_get_contents('php://input'));
    if (isset($datos->accion)) {
        $accion = $datos->accion;
        
        switch ($accion) {
            // case "consultarLibros":
            //     $resultado = CONFConsultarLibros();  

            //     echo json_encode($resultado);
            //     break;
            case "CONFObtenerLibrosPopulares":
                $listaIdsLibros = obtenerListaIdsLibrosPopulares();  
                $listaLibros = implode(',', $listaIdsLibros);
                $resultados = obtenerLibrosArrayIds($listaLibros);

                echo json_encode($resultados);
                break;
            case "CONFObtenerLibrosRecomendados":
                $listaIdsLibros = obtenerListaIdsLibrosRecomendados();  
                
                $listaLibros = implode(',', $listaIdsLibros);
                $resultados = obtenerLibrosArrayGenero($listaLibros);

                echo json_encode($resultados);
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
            case "INVRegistrarVisualizacion":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $datos->fecha = date('Y-m-d');
                $resultado = INVRegistrarVisualizacion($datos);

                echo json_encode($resultado);
                break;
            case "CONFObtenerGenerosFiltros":
                $resultado = CONFObtenerGenerosFiltros();

                echo json_encode($resultado);
                break;
            case "CONFFiltrarLibros":
                $datos->generos = implode(',', $datos->generos);
                // echo json_encode(empty($datos->generos));
                $resultado = CONFFiltrarLibros($datos);

                echo json_encode($resultado);
                break;
            case "VENRegistrarVenta":
                $datos->idUsuario = $_SESSION["idUsuario"];
                $datos->fecha = date('Y-m-d');
                $datos->hora = date('H:i:s');


                $diferencia = comprobarDiferenciaCarritoInventario($_SESSION["idUsuario"]);
                if (!$diferencia) {
                    echo json_encode($diferencia);
                    break;
                }
                $datosCarrito = VENObtenerLibrosCarritoCompra($_SESSION["idUsuario"]);

                if (!registrarVentaMaestra($datos)) {
                    echo json_encode(false);
                    break;
                }
                
                $idVenta = obtenerIdVentaMaestra($datos);
                if (!registrarVentasDetalle($idVenta, $datosCarrito)) {
                    echo json_encode(false);
                    break;
                } else if (!salidaInventarioVenta($datosCarrito)) {
                    echo json_encode(false);
                    break;
                } else if(!VENLimpiarCarritoCompra($datos->idUsuario)) {
                    echo json_encode(false);
                    break;
                }
                
                echo json_encode(true);
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