<ul class="barra">
  <li><a href="../Vistas/principal.php">Inicio <i class="fa-solid fa-home"></i></a></li>
  <li><a id="linkCompras" href="../Vistas/compras.php">Mis Compras <i id="iconoCompras" class="fa-solid fa-book"></i></a></li>
  <li class="align-right"><a onclick="cerrarSesion();"><i class="fa fa-sign-out"></i> Cerrar Sesion</a></li>
  <li class="align-right"><a id="linkCarrito" href="../Vistas/carrito.php"><i id="iconoCarrito" class="fa-solid fa-shopping-cart"></i> Carrito</i></a></li>
  <li id="barraUsuario" class="align-right"><a onclick="abrirModalUsuario();"><i class="fa fa-user-circle" id="iconoUsuario"></i></a></li>
</ul>

<div id="modalUsuario" class="modalUsuario" style="display: none;">
  <section id="contenidoModalUsuario" class="contenidoModalUsuario">
    <div class="headerModal">
      <h1 id="tituloModalUsuario">Informacion del Usuario</h1>
    </div>
    <div class="bodyModal">
      <div class="row">
        <label class="label-modal">Nombre del Usuario </label>
        <input type="text" id="nombreUsuario" class="input-control input-modal">
      </div>
      <div class="row">
        <label class="label-modal">Apellido Paterno del Usuario </label>
        <input type="text" id="apellidoPaternoUsuario" class="input-control input-modal">
      </div>
      <div class="row">
        <label class="label-modal">Apellido Materno del Usuario </label>
        <input type="text" id="apellidoMaternoUsuario" class="input-control input-modal">
      </div>
      <div class="row">
        <label class="label-modal">Correo Electronico </label>
        <input type="text" id="correoUsuario" class="input-control input-modal">
      </div>
      <div class="row">
        <label class="label-modal">Numero Telefonico </label>
        <input type="text" id="telefonoUsuario" class="input-control input-modal">
      </div>
      <div class="row">
        <label class="label-modal">Fecha de Nacimiento </label>
        <input type="date" id="fechaUsuario" class="input-control input-modal">
      </div>
    </div>
  
    <footer class="footerModal">
      <button id="cerrarModalUsaurio" class="botonFooterModalUsuario" onclick="cerrarModalUsuario()"><i class="fa fa-times-circle"></i> Cerrar</button>
      <button id="guardarInformacionUsuario" class="botonFooterModalUsuario" onclick="guardarInformacionUsuarioModal()"><i class="fa fa-plus"></i> Guardar Informacion</button>
    </footer>
  </section>
</div>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
<link rel="stylesheet" href="../layouts/barra.css">
<script src="../sweetalert2.all.min.js"></script>
<script src="../jquery-3.7.1.min.js"></script>
<script src="../dataTables.min.js"></script>
<script src="../layouts/barra.js"></script>