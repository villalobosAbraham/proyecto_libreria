<link rel="stylesheet" href="../Vistas/estilos/login.css">
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
    <title>Librería digital</title>
</head>
<body>
    <header>
        <img src="../imagenes/logo.png" alt="Logo">
        <h1>Librería digital</h1>
    </header>
    <main>
        <div id="login" class="login">
            <h2>Inicio de Sesión</h2>
            <label>Correo:</label>
            <input type="text" id="correoLogin">
            <label>Contraseña:</label>
            <input type="password" id="contraseñaLogin" name="contrasena">
            <button onclick="iniciarSesion();">Iniciar Sesión <i class="fa fa-sign-in"></i></button>
            <p id="sinSesion" onclick="mostrarRegistro();">Registrarse <i class="fa fa-user-plus"></i> </p>
        </div>
        <section id="registro" class="registro">
            <h2>Registro de Usuario</h2>
            <label >Correo:</label>
            <input type="text" id="correoRegistro">
            <label >Contraseña:</label>
            <input type="password" id="contraseñaRegistro" >
            <label >Nombre(s):</label>
            <input type="text" id="nombres">
            <label >Apellido Paterno:</label>
            <input type="text" id="apellidoPaterno">
            <label >Apellido Materno:</label>
            <input type="text" id="apellidoMaterno">
            <button onclick="registrarUsuario();">Registrar Usuario <i class="fa fa-user-plus"></i></button>
            <p id="sesion" onclick="mostrarLogin();">Iniciar Sesion <i class="fa fa-sign-in"> </i> </p>
        </section>
        <section>
            <input type="file" id="inputImagen" onchange="convertirImagen(this);" accept="image/*">
        </section>
        <section>
            <div id="contenedorImagen"></div>
        </section>
    </main>
</body>
</html>

<script src="../Vistas/js/login.js">
    
</script>