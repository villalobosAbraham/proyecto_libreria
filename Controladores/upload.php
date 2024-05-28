<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['image'])) {
        $targetDir = "imagenes_libro/";
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
        
        // Generar el nombre de archivo personalizado
        $customName = !empty($_POST['customName']) ? $_POST['customName'] : pathinfo($_FILES["image"]["name"], PATHINFO_FILENAME);
        $targetFile = $targetDir . $customName . "." . $imageFileType;

        // Verificar si el archivo es una imagen real
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check !== false) {
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }

        // Verificar si el archivo ya existe
        if (file_exists($targetFile)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }

        // Limitar el tamaño del archivo
        if ($_FILES["image"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        // Permitir ciertos formatos de archivo
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        // Verificar si $uploadOk es 0 debido a un error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        } else {
            // Intentar mover el archivo cargado al directorio destino
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
                echo json_encode(["imageUrl" => $targetFile]);
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
    } elseif (isset($_POST['deleteImage'])) {
        $fileToDelete = $_POST['deleteImage'];
        if (file_exists($fileToDelete)) {
            print_r($fileToDelete);
            if (unlink($fileToDelete)) {
                echo json_encode(["status" => "success"]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to delete the file."]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "File does not exist."]);
        }
    }
}
?>