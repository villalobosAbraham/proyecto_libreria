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
                $idUsuario = $_SESSION["idUsuario"];
                $listaIdsLibros = obtenerListaIdsLibrosRecomendados($idUsuario);  
                
                $listaLibros = implode(',', $listaIdsLibros);
                $resultados = obtenerLibrosArrayGenero($listaLibros);

                echo json_encode($resultados);
                break;
            case "VENAgregarAumentarLibroCarrito":
                $datos->idUsuario = $_SESSION["idUsuario"];
                
                $libro = comprobarExistenciaLibroCarrito($datos);
                
                if (!$libro) {
                    echo json_encode(agregarLibroCarrito($datos));
                } else {
                    $cantidadLibro = $libro["cantidad"];
                    $cantidadStock = $libro["stock"];
                    // print_r($cantidadStock . " | " . $cantidadLibro . " " . $datos->aumento);
                    if ($cantidadStock < ($cantidadLibro + $datos->aumento)) {
                        echo json_encode(false);
                        break;
                    }
                    $datos->cantidad = $cantidadLibro + $datos->aumento;
                    echo json_encode(actualizarLibroCarritoCompra($datos));
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
                // print_r("diferencia: " . $diferencia. " | ");
                if (!$diferencia) {
                    echo json_encode(false);
                    break;
                }
                $datosCarrito = VENObtenerLibrosCarritoCompra($_SESSION["idUsuario"]);
                // print_r("datos Carrito: " . $datosCarrito. " | ");
                if (!registrarVentaMaestra($datos)) {
                    echo json_encode(false);
                    break;
                }
                
                $idVenta = obtenerIdVentaMaestra($datos);
                // print_r("Id Venta: " . $idVenta. " | ");
                if (!registrarVentasDetalle($idVenta, $datosCarrito)) {
                    // print_r("Registro de venta: " . registrarVentasDetalle($idVenta, $datosCarrito). " | ");
                    echo json_encode(false);
                    break;
                } else if (!salidaInventarioVenta($datosCarrito)) {
                    // print_r("Salida de Inventario: " . salidaInventarioVenta($datosCarrito). " | ");
                    echo json_encode(false);
                    break;
                } else if(!VENLimpiarCarritoCompra($datos->idUsuario)) {
                    // print_r("Limpieza de Carrito: " . VENLimpiarCarritoCompra($datos->idUsuario). " | ");
                    echo json_encode(false);
                    break;
                }
                // print_r("Todo al vergazo");
                echo json_encode(true);
                break;
            case "CONFComprobarUsuario":
                $resultado = isset($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "CONFObtenerLibros":
                $resultado = CONFObtenerLibros();

                echo json_encode($resultado);
                break;
            case "CONFObtenerDetallesVenta":
                $resultado = CONFObtenerDetallesVenta($datos->idVenta);

                echo json_encode($resultado);
                break;
            case "CONFObtenerComprasUsuario":
                $resultado = CONFObtenerComprasUsuario($_SESSION["idUsuario"]);

                echo json_encode($resultado);
                break;
            case "CONFObtenerAutoresActivos":
                $resultado = CONFObtenerAutoresActivos();

                echo json_encode($resultado);
                break;
            case "CONFObtenerAutores":
                $resultado = CONFObtenerAutores();

                echo json_encode($resultado);
                break;
            case "CONFObtenerGenerosActivos":
                $resultado = CONFObtenerGenerosActivos();

                echo json_encode($resultado);
                break;
            case "CONFObtenerEditorialesActivos":
                $resultado = CONFObtenerEditorialesActivos();

                echo json_encode($resultado);
                break;
            case "CONFObtenerIdiomasActivos":
                $resultado = CONFObtenerIdiomasActivos();

                echo json_encode($resultado);
                break;
            case "CONFAgregarLibroCatalogo":
                $datos->fechahoy = date('Y-m-d');
                $resultado = CONFAgregarLibroCatalogo($datos);

                echo json_encode($resultado);
                break;
            case "CONFDeshabilitarLibro":
                $resultado = CONFDeshabilitarLibro($datos);

                echo json_encode($resultado);
                break;
            case "CONFHabilitarLibro":
                $resultado = CONFHabilitarLibro($datos);

                echo json_encode($resultado);
                break;
            case "CONFDeshabilitarAutor":
                $resultado = CONFDeshabilitarAutor($datos);

                echo json_encode($resultado);
                break;
            case "CONFHabilitarAutor":
                $resultado = CONFHabilitarAutor($datos);

                echo json_encode($resultado);
                break;
            default:
                echo json_encode(array("error" => "Acción no válida"));
        }
    } else {
        echo json_encode(array("error" => "No se proporcionó ninguna acción"));
    }
}