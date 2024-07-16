/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 100432
 Source Host           : localhost:3306
 Source Schema         : libreria_proyecto

 Target Server Type    : MySQL
 Target Server Version : 100432
 File Encoding         : 65001

 Date: 16/07/2024 00:48:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cat_editoriales
-- ----------------------------
DROP TABLE IF EXISTS `cat_editoriales`;
CREATE TABLE `cat_editoriales`  (
  `ideditorial` int NOT NULL AUTO_INCREMENT,
  `editorial` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ideditorial`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cat_editoriales
-- ----------------------------
INSERT INTO `cat_editoriales` VALUES (1, 'Editorial Planeta', 'S');
INSERT INTO `cat_editoriales` VALUES (2, 'Penguin Random House', 'S');
INSERT INTO `cat_editoriales` VALUES (3, 'HarperCollins', 'S');
INSERT INTO `cat_editoriales` VALUES (4, 'Simon & Schuster', 'S');
INSERT INTO `cat_editoriales` VALUES (5, 'Hachette Livre', 'S');
INSERT INTO `cat_editoriales` VALUES (6, 'Macmillan Publishers', 'S');
INSERT INTO `cat_editoriales` VALUES (7, 'Scholastic Corporation', 'S');
INSERT INTO `cat_editoriales` VALUES (8, 'Bloomsbury Publishing', 'S');
INSERT INTO `cat_editoriales` VALUES (9, 'Pearson Education', 'S');
INSERT INTO `cat_editoriales` VALUES (10, 'Oxford University Press', 'S');
INSERT INTO `cat_editoriales` VALUES (11, 'Cambridge University Press', 'S');
INSERT INTO `cat_editoriales` VALUES (12, 'Springer Nature', 'S');
INSERT INTO `cat_editoriales` VALUES (13, 'Wiley', 'S');
INSERT INTO `cat_editoriales` VALUES (14, 'Cengage Learning', 'S');
INSERT INTO `cat_editoriales` VALUES (15, 'McGraw-Hill Education', 'S');
INSERT INTO `cat_editoriales` VALUES (16, 'Sage Publications', 'S');
INSERT INTO `cat_editoriales` VALUES (17, 'Thomson Reuters', 'S');
INSERT INTO `cat_editoriales` VALUES (18, 'Taylor & Francis', 'S');
INSERT INTO `cat_editoriales` VALUES (19, 'Elsevier', 'S');
INSERT INTO `cat_editoriales` VALUES (20, 'Brill Publishers', 'S');

-- ----------------------------
-- Table structure for cat_idioma
-- ----------------------------
DROP TABLE IF EXISTS `cat_idioma`;
CREATE TABLE `cat_idioma`  (
  `ididioma` int NOT NULL AUTO_INCREMENT,
  `idioma` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`ididioma`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cat_idioma
-- ----------------------------
INSERT INTO `cat_idioma` VALUES (1, 'Español', 'S');
INSERT INTO `cat_idioma` VALUES (2, 'Ingles', 'S');
INSERT INTO `cat_idioma` VALUES (3, 'Frances', 'S');
INSERT INTO `cat_idioma` VALUES (4, 'Aleman', 'S');

-- ----------------------------
-- Table structure for cat_libros
-- ----------------------------
DROP TABLE IF EXISTS `cat_libros`;
CREATE TABLE `cat_libros`  (
  `idlibro` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `precio` float(32, 0) NOT NULL,
  `descuento` float(32, 0) NOT NULL,
  `iva` float(32, 0) NOT NULL,
  `idgeneroprincipal` int NOT NULL,
  `fechapublicacion` date NOT NULL,
  `portada` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sinopsis` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecharegistro` date NOT NULL,
  `paginas` int NOT NULL,
  `ididioma` int NOT NULL,
  `ideditorial` int NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idlibro`) USING BTREE,
  INDEX `idgeneroprincipal`(`idgeneroprincipal`) USING BTREE,
  CONSTRAINT `cat_libros_ibfk_1` FOREIGN KEY (`idgeneroprincipal`) REFERENCES `conf_genero` (`idgenero`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 42 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cat_libros
-- ----------------------------
INSERT INTO `cat_libros` VALUES (1, 'el libro chido', 100, 0, 16, 1, '2024-03-20', 'imagenes_libro/juan.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quae totam ex incidunt dolor, omnis consequuntur numquam, non corporis, iste repudiandae facilis consectetur veritatis? Dicta corrupti impedit provident vitae quo?', '2024-03-20', 125, 1, 5, 'S');
INSERT INTO `cat_libros` VALUES (2, 'el libro chido 2', 120, 0, 16, 1, '2024-03-20', 'imagenes_libro/xd.jpg', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quae totam ex incidunt dolor, omnis consequuntur numquam, non corporis, iste repudiandae facilis consectetur veritatis? Dicta corrupti impedit provident vitae quo?', '2024-03-20', 354, 1, 10, 'S');
INSERT INTO `cat_libros` VALUES (3, 'el libro chido 3', 120, 0, 16, 2, '2024-03-20', '', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quae totam ex incidunt dolor, omnis consequuntur numquam, non corporis, iste repudiandae facilis consectetur veritatis? Dicta corrupti impedit provident vitae quo?', '2024-03-20', 154, 1, 2, 'N');
INSERT INTO `cat_libros` VALUES (4, 'el libro chido 4', 120, 0, 16, 2, '2024-03-20', '', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae quae totam ex incidunt dolor, omnis consequuntur numquam, non corporis, iste repudiandae facilis consectetur veritatis? Dicta corrupti impedit provident vitae quo?', '2024-03-20', 275, 1, 19, 'N');
INSERT INTO `cat_libros` VALUES (5, 'Cien Años de Soledad', 500, 50, 72, 3, '1967-05-30', 'imagenes_libro/cien_años_de_soledad.jpg', 'La historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.', '2024-05-26', 417, 1, 1, 'N');
INSERT INTO `cat_libros` VALUES (6, '1984', 600, 100, 80, 3, '1949-06-08', 'imagenes_libro/1984.jpg', 'Una distopía sobre un régimen totalitario que vigila y controla a sus ciudadanos.', '2024-05-26', 328, 1, 2, 'N');
INSERT INTO `cat_libros` VALUES (7, 'El Hobbit', 450, 50, 64, 4, '1937-09-21', 'imagenes_libro/el_hobbit.jpg', 'La aventura de Bilbo Bolsón en su viaje para ayudar a los enanos a recuperar su hogar.', '2024-05-26', 310, 1, 3, 'S');
INSERT INTO `cat_libros` VALUES (8, 'Don Quijote de la Mancha', 700, 70, 101, 4, '1605-01-16', 'imagenes_libro/don_quijote_de_la_mancha.jpg', 'Las aventuras de Alonso Quijano, un hombre que se cree un caballero andante.', '2024-05-26', 1072, 1, 4, 'S');
INSERT INTO `cat_libros` VALUES (9, 'Crónica de una Muerte Anunciada', 350, 30, 51, 5, '1981-03-01', 'imagenes_libro/cronica_de_una_muerte_anunciada.jpg', 'La narración del asesinato de Santiago Nasar en un pequeño pueblo.', '2024-05-26', 122, 1, 5, 'S');
INSERT INTO `cat_libros` VALUES (10, 'El Principito', 200, 20, 29, 5, '1943-04-06', 'imagenes_libro/el_principito.jpg', 'La historia de un joven príncipe que explora el universo y aprende sobre la vida.', '2024-05-26', 96, 1, 6, 'S');
INSERT INTO `cat_libros` VALUES (11, 'Rayuela', 650, 65, 94, 6, '1963-06-28', 'imagenes_libro/rayuela.jpg', 'Una novela que puede leerse de diversas maneras, siguiendo diferentes caminos.', '2024-05-26', 736, 1, 7, 'N');
INSERT INTO `cat_libros` VALUES (12, 'La Sombra del Viento', 800, 80, 115, 6, '2001-04-01', 'imagenes_libro/la_sombra_del_viento.jpg', 'La historia de un joven en la Barcelona de posguerra que descubre un libro misterioso.', '2024-05-26', 576, 1, 8, 'S');
INSERT INTO `cat_libros` VALUES (13, 'El Nombre de la Rosa', 750, 75, 108, 7, '1980-08-01', 'imagenes_libro/el_nombre_de_la_rosa.jpg', 'Un thriller histórico ambientado en un monasterio medieval.', '2024-05-26', 512, 1, 9, 'S');
INSERT INTO `cat_libros` VALUES (14, 'Harry Potter y la Piedra Filosofal', 550, 55, 79, 7, '1997-06-26', 'imagenes_libro/harry_potter_y_la_piedra_filosofal.jpg', 'El inicio de las aventuras de Harry Potter en el mundo de la magia.', '2024-05-26', 309, 1, 10, 'S');
INSERT INTO `cat_libros` VALUES (15, 'Orgullo y Prejuicio', 400, 40, 58, 8, '1813-01-28', 'imagenes_libro/orgullo_y_prejuicio.jpeg', 'La historia de Elizabeth Bennet y sus malentendidos con el señor Darcy.', '2024-05-26', 279, 1, 11, 'S');
INSERT INTO `cat_libros` VALUES (16, 'Matar a un Ruiseñor', 450, 45, 65, 8, '1960-07-11', 'imagenes_libro/matar_a_un_ruiseñor.jpg', 'Una joven en Alabama observa los prejuicios raciales en su ciudad.', '2024-05-26', 281, 1, 12, 'S');
INSERT INTO `cat_libros` VALUES (17, 'La Metamorfosis', 300, 30, 43, 9, '1915-10-01', 'imagenes_libro/la_metamorfosis.jpg', 'Un hombre despierta transformado en un insecto gigante.', '2024-05-26', 201, 1, 13, 'S');
INSERT INTO `cat_libros` VALUES (18, 'El Gran Gatsby', 350, 35, 50, 9, '1925-04-10', 'imagenes_libro/el_gran_gatsby.jpeg', 'La historia del misterioso millonario Jay Gatsby y su obsesión con Daisy Buchanan.', '2024-05-26', 180, 1, 14, 'N');
INSERT INTO `cat_libros` VALUES (19, 'Moby Dick', 600, 60, 86, 10, '1851-10-18', 'imagenes_libro/moby_dick.jpg', 'La narración de la obsesiva búsqueda del capitán Ahab por la gran ballena blanca.', '2024-05-26', 635, 1, 15, 'S');
INSERT INTO `cat_libros` VALUES (20, 'El Amor en los Tiempos del Cólera', 500, 50, 72, 10, '1985-03-06', 'imagenes_libro/el_amor_en_los_tiempos_del_colera.jpg', 'Una historia de amor que abarca más de cincuenta años.', '2024-05-26', 368, 1, 16, 'N');
INSERT INTO `cat_libros` VALUES (21, 'La Casa de los Espíritus', 550, 55, 79, 11, '1982-10-01', 'imagenes_libro/la_casa_de_los_espiritus.jpg', 'Una novela que cuenta la historia de la familia Trueba a lo largo de generaciones.', '2024-05-26', 481, 1, 17, 'S');
INSERT INTO `cat_libros` VALUES (22, 'Los Miserables', 800, 80, 115, 11, '1862-01-01', 'imagenes_libro/los_miserables.jpg', 'La historia de varios personajes en Francia durante el siglo XIX.', '2024-05-26', 1232, 1, 18, 'S');
INSERT INTO `cat_libros` VALUES (23, 'El Retrato de Dorian Gray', 450, 45, 65, 12, '1890-07-20', 'imagenes_libro/el_retrato_de_dorian_gray.jpg', 'Un joven vende su alma para mantenerse siempre joven mientras su retrato envejece.', '2024-05-26', 254, 1, 19, 'S');
INSERT INTO `cat_libros` VALUES (24, 'La Divina Comedia', 700, 70, 101, 12, '1320-01-01', 'imagenes_libro/la_divina_comedia.jpg', 'El viaje de Dante a través del Infierno, el Purgatorio y el Paraíso.', '2024-05-26', 798, 1, 20, 'S');
INSERT INTO `cat_libros` VALUES (25, 'Drácula', 450, 45, 65, 13, '1897-05-26', 'imagenes_libro/dracula.jpg', 'La historia del Conde Drácula y su intento de mudarse a Inglaterra.', '2024-05-26', 418, 1, 1, 'S');
INSERT INTO `cat_libros` VALUES (26, 'El Proceso', 500, 50, 72, 13, '1925-04-01', 'imagenes_libro/el_proceso.jpg', 'Un hombre es arrestado y juzgado sin saber nunca el motivo.', '2024-05-26', 320, 1, 2, 'N');
INSERT INTO `cat_libros` VALUES (27, 'Frankenstein', 400, 40, 58, 14, '1818-01-01', 'imagenes_libro/frankenstein.jpg', 'La historia del científico Victor Frankenstein y su monstruosa creación.', '2024-05-26', 280, 1, 3, 'S');
INSERT INTO `cat_libros` VALUES (28, 'Jane Eyre', 550, 55, 79, 15, '1847-10-16', 'imagenes_libro/jane_eyre.jpg', 'La vida y amores de la huérfana Jane Eyre.', '2024-05-26', 532, 1, 4, 'S');
INSERT INTO `cat_libros` VALUES (29, 'El Señor de los Anillos: La Comunidad del Anillo', 600, 60, 86, 16, '1954-07-29', 'imagenes_libro/el_señor_de_los_anillos_la_comunidad_del_anillo.jpg', 'La primera parte de la épica aventura de Frodo Bolsón y la Comunidad del Anillo.', '2024-05-26', 423, 1, 5, 'S');
INSERT INTO `cat_libros` VALUES (30, 'Ulises', 700, 70, 101, 17, '1922-02-02', 'imagenes_libro/ulises.jpg', 'Un día en la vida de Leopold Bloom en Dublín.', '2024-05-26', 730, 1, 6, 'S');
INSERT INTO `cat_libros` VALUES (31, 'Ana Karenina', 650, 65, 94, 18, '1877-01-01', 'imagenes_libro/ana_karenina.jpg', 'La trágica historia de la aristócrata Ana Karenina y su amor prohibido.', '2024-05-26', 864, 1, 7, 'S');
INSERT INTO `cat_libros` VALUES (32, 'Madame Bovary', 400, 40, 58, 19, '1857-01-01', 'imagenes_libro/madame_bovary.jpg', 'La vida de Emma Bovary y sus intentos de escapar de la monotonía burguesa.', '2024-05-26', 328, 1, 8, 'S');
INSERT INTO `cat_libros` VALUES (33, 'Crimen y Castigo', 600, 60, 86, 20, '1866-01-01', 'imagenes_libro/crimen_y_castigo.jpg', 'La atormentada vida de Raskólnikov después de cometer un asesinato.', '2024-05-26', 430, 1, 9, 'S');
INSERT INTO `cat_libros` VALUES (34, 'El Guardián entre el Centeno', 450, 45, 65, 21, '1951-07-16', 'imagenes_libro/el_guardian_entre_el_centeno.jpg', 'Las experiencias de Holden Caulfield en Nueva York tras ser expulsado de la escuela.', '2024-05-26', 277, 1, 10, 'S');
INSERT INTO `cat_libros` VALUES (40, 'chirstine', 500, 200, 48, 2, '2003-02-01', 'imagenes_libro/chi_Pab_20030201_05062024.jpg', 'hfuihsduiewnpuihhfuihsduiewnpuihhfuihsduiewnpuihhfuihsduiewnpuih', '2024-06-05', 356, 1, 6, 'S');
INSERT INTO `cat_libros` VALUES (41, 'lola', 500, 200, 48, 9, '2000-06-12', 'imagenes_libro/lol_Isa_20000612_05062024.jpg', 'bduowhdibduowhdibduowhdibduowhdibduowhdi', '2024-06-05', 136, 1, 13, 'S');

-- ----------------------------
-- Table structure for cat_librosautores
-- ----------------------------
DROP TABLE IF EXISTS `cat_librosautores`;
CREATE TABLE `cat_librosautores`  (
  `iddetalle` int NOT NULL AUTO_INCREMENT,
  `idlibro` int NOT NULL,
  `idautor` int NOT NULL,
  PRIMARY KEY (`iddetalle`) USING BTREE,
  INDEX `idlibro`(`idlibro`) USING BTREE,
  INDEX `idautor`(`idautor`) USING BTREE,
  CONSTRAINT `cat_librosautores_ibfk_1` FOREIGN KEY (`idlibro`) REFERENCES `cat_libros` (`idlibro`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `cat_librosautores_ibfk_2` FOREIGN KEY (`idautor`) REFERENCES `conf_autores` (`idautor`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 59 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cat_librosautores
-- ----------------------------
INSERT INTO `cat_librosautores` VALUES (1, 5, 5);
INSERT INTO `cat_librosautores` VALUES (3, 2, 8);
INSERT INTO `cat_librosautores` VALUES (4, 3, 7);
INSERT INTO `cat_librosautores` VALUES (6, 1, 1);
INSERT INTO `cat_librosautores` VALUES (7, 4, 7);
INSERT INTO `cat_librosautores` VALUES (8, 4, 18);
INSERT INTO `cat_librosautores` VALUES (9, 5, 22);
INSERT INTO `cat_librosautores` VALUES (10, 5, 7);
INSERT INTO `cat_librosautores` VALUES (11, 6, 9);
INSERT INTO `cat_librosautores` VALUES (12, 6, 23);
INSERT INTO `cat_librosautores` VALUES (13, 7, 16);
INSERT INTO `cat_librosautores` VALUES (14, 7, 10);
INSERT INTO `cat_librosautores` VALUES (15, 8, 19);
INSERT INTO `cat_librosautores` VALUES (16, 8, 20);
INSERT INTO `cat_librosautores` VALUES (17, 9, 14);
INSERT INTO `cat_librosautores` VALUES (18, 9, 8);
INSERT INTO `cat_librosautores` VALUES (19, 10, 17);
INSERT INTO `cat_librosautores` VALUES (20, 10, 15);
INSERT INTO `cat_librosautores` VALUES (21, 11, 20);
INSERT INTO `cat_librosautores` VALUES (22, 11, 5);
INSERT INTO `cat_librosautores` VALUES (23, 12, 8);
INSERT INTO `cat_librosautores` VALUES (24, 12, 23);
INSERT INTO `cat_librosautores` VALUES (25, 13, 18);
INSERT INTO `cat_librosautores` VALUES (26, 13, 19);
INSERT INTO `cat_librosautores` VALUES (27, 14, 16);
INSERT INTO `cat_librosautores` VALUES (28, 14, 19);
INSERT INTO `cat_librosautores` VALUES (29, 15, 23);
INSERT INTO `cat_librosautores` VALUES (30, 15, 8);
INSERT INTO `cat_librosautores` VALUES (31, 16, 14);
INSERT INTO `cat_librosautores` VALUES (32, 16, 20);
INSERT INTO `cat_librosautores` VALUES (33, 17, 10);
INSERT INTO `cat_librosautores` VALUES (34, 17, 10);
INSERT INTO `cat_librosautores` VALUES (35, 18, 18);
INSERT INTO `cat_librosautores` VALUES (36, 18, 9);
INSERT INTO `cat_librosautores` VALUES (37, 19, 11);
INSERT INTO `cat_librosautores` VALUES (38, 19, 24);
INSERT INTO `cat_librosautores` VALUES (39, 20, 16);
INSERT INTO `cat_librosautores` VALUES (40, 20, 7);
INSERT INTO `cat_librosautores` VALUES (41, 21, 23);
INSERT INTO `cat_librosautores` VALUES (42, 22, 8);
INSERT INTO `cat_librosautores` VALUES (43, 23, 8);
INSERT INTO `cat_librosautores` VALUES (44, 24, 12);
INSERT INTO `cat_librosautores` VALUES (45, 25, 10);
INSERT INTO `cat_librosautores` VALUES (46, 26, 9);
INSERT INTO `cat_librosautores` VALUES (47, 27, 11);
INSERT INTO `cat_librosautores` VALUES (48, 28, 23);
INSERT INTO `cat_librosautores` VALUES (49, 29, 16);
INSERT INTO `cat_librosautores` VALUES (50, 30, 10);
INSERT INTO `cat_librosautores` VALUES (51, 31, 15);
INSERT INTO `cat_librosautores` VALUES (52, 32, 19);
INSERT INTO `cat_librosautores` VALUES (53, 33, 8);
INSERT INTO `cat_librosautores` VALUES (54, 34, 16);
INSERT INTO `cat_librosautores` VALUES (57, 40, 12);
INSERT INTO `cat_librosautores` VALUES (58, 41, 6);

-- ----------------------------
-- Table structure for conf_autores
-- ----------------------------
DROP TABLE IF EXISTS `conf_autores`;
CREATE TABLE `conf_autores`  (
  `idautor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidopaterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidomaterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fechanacimiento` date NOT NULL,
  `fecharegistro` date NOT NULL,
  `idnacionalidad` int NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`idautor`) USING BTREE,
  INDEX `idnacionalidad`(`idnacionalidad`) USING BTREE,
  CONSTRAINT `conf_autores_ibfk_1` FOREIGN KEY (`idnacionalidad`) REFERENCES `conf_nacionalidad` (`idnacionalidad`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conf_autores
-- ----------------------------
INSERT INTO `conf_autores` VALUES (1, 'autor', 'el', 'chido', '1989-04-04', '2024-04-03', 1, 'S');
INSERT INTO `conf_autores` VALUES (4, 'pepe', 'otro', 'autor', '1980-04-05', '2024-04-03', 1, 'S');
INSERT INTO `conf_autores` VALUES (5, 'Gabriel', 'García', 'Márquez', '1927-03-06', '2024-05-10', 1, 'N');
INSERT INTO `conf_autores` VALUES (6, 'Isabel', 'Allende', 'Llona', '1942-08-02', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (7, 'Mario', 'Vargas', 'Llosa', '1936-03-28', '2024-05-10', 1, 'N');
INSERT INTO `conf_autores` VALUES (8, 'Julio', 'Cortázar', 'Descotte', '1914-08-26', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (9, 'Jorge', 'Luis', 'Borges', '1899-08-24', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (10, 'Carlos', 'Fuentes', 'Macias', '1928-11-11', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (11, 'Octavio', 'Paz', 'Lozano', '1914-03-31', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (12, 'Pablo', 'Neruda', 'Reyes', '1904-07-12', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (13, 'Laura', 'Esquivel', 'Valdés', '1950-09-30', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (14, 'Miguel', 'Ángel', 'Asturias', '1899-10-19', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (15, 'Roberto', 'Bolaño', 'Ávalos', '1953-04-28', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (16, 'Juan', 'Rulfo', 'Vizcaíno', '1917-05-16', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (17, 'José', 'Saramago', 'de Sousa', '1922-11-16', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (18, 'Gabriela', 'Mistral', 'Godoy', '1889-04-07', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (19, 'Horacio', 'Quiroga', 'Forteza', '1878-12-31', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (20, 'Jorge', 'Amado', 'de Faria', '1912-08-10', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (21, 'José', 'Martí', 'Pérez', '1853-01-28', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (22, 'Mario', 'Benedetti', 'Farrugia', '1920-09-14', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (23, 'Carlos', 'Drummond', 'de Andrade', '1902-10-31', '2024-05-10', 1, 'S');
INSERT INTO `conf_autores` VALUES (24, 'Rosa', 'Montero', 'Gayo', '1951-01-03', '2024-05-10', 2, 'S');
INSERT INTO `conf_autores` VALUES (25, 'Jesus', 'Villalobos', 'Fonseca', '2003-02-01', '2024-06-06', 1, 'S');

-- ----------------------------
-- Table structure for conf_estadoentrega
-- ----------------------------
DROP TABLE IF EXISTS `conf_estadoentrega`;
CREATE TABLE `conf_estadoentrega`  (
  `idestadoentrega` int NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idestadoentrega`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conf_estadoentrega
-- ----------------------------
INSERT INTO `conf_estadoentrega` VALUES (1, 'Pendiente de Recoger', 'S');
INSERT INTO `conf_estadoentrega` VALUES (2, 'Recogido', 'S');

-- ----------------------------
-- Table structure for conf_genero
-- ----------------------------
DROP TABLE IF EXISTS `conf_genero`;
CREATE TABLE `conf_genero`  (
  `idgenero` int NOT NULL AUTO_INCREMENT,
  `genero` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idgenero`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conf_genero
-- ----------------------------
INSERT INTO `conf_genero` VALUES (1, 'Acción', 'S');
INSERT INTO `conf_genero` VALUES (2, 'Ficción', 'S');
INSERT INTO `conf_genero` VALUES (3, 'No Ficción', 'S');
INSERT INTO `conf_genero` VALUES (4, 'Ciencia Ficción', 'S');
INSERT INTO `conf_genero` VALUES (5, 'Fantasía', 'S');
INSERT INTO `conf_genero` VALUES (6, 'Misterio', 'S');
INSERT INTO `conf_genero` VALUES (7, 'Thriller', 'S');
INSERT INTO `conf_genero` VALUES (8, 'Romance', 'S');
INSERT INTO `conf_genero` VALUES (9, 'Terror', 'S');
INSERT INTO `conf_genero` VALUES (10, 'Histórica', 'S');
INSERT INTO `conf_genero` VALUES (11, 'Biografía', 'S');
INSERT INTO `conf_genero` VALUES (12, 'Autobiografía', 'S');
INSERT INTO `conf_genero` VALUES (13, 'Aventura', 'S');
INSERT INTO `conf_genero` VALUES (14, 'Infantil', 'S');
INSERT INTO `conf_genero` VALUES (15, 'Juvenil', 'S');
INSERT INTO `conf_genero` VALUES (16, 'Poesía', 'S');
INSERT INTO `conf_genero` VALUES (17, 'Drama', 'S');
INSERT INTO `conf_genero` VALUES (18, 'Comedia', 'S');
INSERT INTO `conf_genero` VALUES (19, 'Ensayo', 'S');
INSERT INTO `conf_genero` VALUES (20, 'Cocina', 'S');
INSERT INTO `conf_genero` VALUES (21, 'Viajes', 'S');

-- ----------------------------
-- Table structure for conf_nacionalidad
-- ----------------------------
DROP TABLE IF EXISTS `conf_nacionalidad`;
CREATE TABLE `conf_nacionalidad`  (
  `idnacionalidad` int NOT NULL AUTO_INCREMENT,
  `nacionalidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `siglas` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idnacionalidad`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conf_nacionalidad
-- ----------------------------
INSERT INTO `conf_nacionalidad` VALUES (1, 'Mexicana', 'MEX', 'S');
INSERT INTO `conf_nacionalidad` VALUES (2, 'Americana', 'USA', 'S');

-- ----------------------------
-- Table structure for inv_inventariolibros
-- ----------------------------
DROP TABLE IF EXISTS `inv_inventariolibros`;
CREATE TABLE `inv_inventariolibros`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `idlibro` int NOT NULL,
  `cantidad` int NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `idlibro`(`idlibro`) USING BTREE,
  CONSTRAINT `inv_inventariolibros_ibfk_1` FOREIGN KEY (`idlibro`) REFERENCES `cat_libros` (`idlibro`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inv_inventariolibros
-- ----------------------------
INSERT INTO `inv_inventariolibros` VALUES (1, 1, 15, 'S');
INSERT INTO `inv_inventariolibros` VALUES (2, 2, 5, 'S');
INSERT INTO `inv_inventariolibros` VALUES (3, 3, 49, 'N');
INSERT INTO `inv_inventariolibros` VALUES (4, 4, 16, 'N');
INSERT INTO `inv_inventariolibros` VALUES (5, 5, 12, 'S');
INSERT INTO `inv_inventariolibros` VALUES (6, 6, 19, 'N');
INSERT INTO `inv_inventariolibros` VALUES (7, 7, 7, 'S');
INSERT INTO `inv_inventariolibros` VALUES (8, 8, 10, 'S');
INSERT INTO `inv_inventariolibros` VALUES (9, 9, 7, 'S');
INSERT INTO `inv_inventariolibros` VALUES (10, 10, 12, 'S');
INSERT INTO `inv_inventariolibros` VALUES (11, 11, 17, 'N');
INSERT INTO `inv_inventariolibros` VALUES (12, 12, 16, 'S');
INSERT INTO `inv_inventariolibros` VALUES (13, 13, 9, 'S');
INSERT INTO `inv_inventariolibros` VALUES (14, 14, 20, 'S');
INSERT INTO `inv_inventariolibros` VALUES (15, 15, 7, 'S');
INSERT INTO `inv_inventariolibros` VALUES (16, 16, 16, 'S');
INSERT INTO `inv_inventariolibros` VALUES (17, 17, 20, 'N');
INSERT INTO `inv_inventariolibros` VALUES (18, 18, 11, 'N');
INSERT INTO `inv_inventariolibros` VALUES (19, 19, 17, 'S');
INSERT INTO `inv_inventariolibros` VALUES (20, 20, 12, 'N');
INSERT INTO `inv_inventariolibros` VALUES (21, 21, 7, 'S');
INSERT INTO `inv_inventariolibros` VALUES (22, 22, 12, 'S');
INSERT INTO `inv_inventariolibros` VALUES (23, 23, 15, 'S');
INSERT INTO `inv_inventariolibros` VALUES (24, 24, 18, 'S');
INSERT INTO `inv_inventariolibros` VALUES (25, 25, 11, 'S');
INSERT INTO `inv_inventariolibros` VALUES (26, 26, 9, 'N');
INSERT INTO `inv_inventariolibros` VALUES (27, 27, 8, 'S');
INSERT INTO `inv_inventariolibros` VALUES (28, 28, 20, 'S');
INSERT INTO `inv_inventariolibros` VALUES (29, 29, 10, 'S');
INSERT INTO `inv_inventariolibros` VALUES (30, 30, 5, 'S');
INSERT INTO `inv_inventariolibros` VALUES (31, 31, 20, 'S');
INSERT INTO `inv_inventariolibros` VALUES (32, 32, 18, 'S');
INSERT INTO `inv_inventariolibros` VALUES (33, 33, 11, 'S');
INSERT INTO `inv_inventariolibros` VALUES (34, 34, 7, 'S');

-- ----------------------------
-- Table structure for inv_visualizaciones
-- ----------------------------
DROP TABLE IF EXISTS `inv_visualizaciones`;
CREATE TABLE `inv_visualizaciones`  (
  `idvisualizacion` bigint NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `idlibro` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idvisualizacion`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 155 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of inv_visualizaciones
-- ----------------------------
INSERT INTO `inv_visualizaciones` VALUES (1, 3, 1, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (2, 3, 5, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (3, 3, 8, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (4, 3, 15, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (5, 3, 20, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (6, 3, 9, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (7, 3, 4, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (8, 3, 5, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (9, 3, 9, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (10, 3, 6, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (11, 31, 5, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (12, 3, 20, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (13, 3, 33, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (14, 3, 4, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (15, 3, 5, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (16, 3, 3, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (17, 3, 3, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (18, 3, 5, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (19, 3, 6, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (20, 3, 2, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (21, 3, 14, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (22, 3, 19, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (23, 3, 7, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (24, 3, 16, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (25, 3, 17, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (26, 3, 15, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (27, 3, 18, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (28, 3, 13, '2024-05-28');
INSERT INTO `inv_visualizaciones` VALUES (29, 3, 3, '2024-05-29');
INSERT INTO `inv_visualizaciones` VALUES (30, 3, 12, '2024-05-29');
INSERT INTO `inv_visualizaciones` VALUES (31, 3, 11, '2024-05-29');
INSERT INTO `inv_visualizaciones` VALUES (32, 3, 9, '2024-05-29');
INSERT INTO `inv_visualizaciones` VALUES (33, 3, 10, '2024-05-29');
INSERT INTO `inv_visualizaciones` VALUES (34, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (35, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (36, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (37, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (38, 3, 5, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (39, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (40, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (41, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (42, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (43, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (44, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (45, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (46, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (47, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (48, 3, 4, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (49, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (50, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (51, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (52, 3, 1, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (53, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (54, 3, 18, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (55, 3, 20, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (56, 3, 17, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (57, 3, 17, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (58, 3, 18, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (59, 3, 19, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (60, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (61, 3, 4, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (62, 3, 5, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (63, 3, 7, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (64, 3, 6, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (65, 3, 8, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (66, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (67, 3, 3, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (68, 3, 4, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (69, 3, 5, '2024-05-30');
INSERT INTO `inv_visualizaciones` VALUES (70, 3, 17, '2024-05-31');
INSERT INTO `inv_visualizaciones` VALUES (71, 3, 1, '2024-05-31');
INSERT INTO `inv_visualizaciones` VALUES (72, 3, 1, '2024-05-31');
INSERT INTO `inv_visualizaciones` VALUES (73, 3, 8, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (74, 3, 8, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (75, 3, 3, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (76, 3, 1, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (77, 3, 1, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (78, 3, 1, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (79, 3, 1, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (80, 3, 3, '2024-06-01');
INSERT INTO `inv_visualizaciones` VALUES (81, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (82, 3, 3, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (83, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (84, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (85, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (86, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (87, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (88, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (89, 3, 3, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (90, 3, 4, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (91, 3, 5, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (92, 3, 18, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (93, 3, 18, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (94, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (95, 3, 1, '2024-06-02');
INSERT INTO `inv_visualizaciones` VALUES (96, 3, 29, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (97, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (98, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (99, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (100, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (101, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (102, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (103, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (104, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (105, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (106, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (107, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (108, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (109, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (110, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (111, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (112, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (113, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (114, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (115, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (116, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (117, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (118, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (119, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (120, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (121, 3, 4, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (122, 3, 4, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (123, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (124, 3, 3, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (125, 3, 1, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (126, 3, 5, '2024-06-04');
INSERT INTO `inv_visualizaciones` VALUES (127, 3, 1, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (128, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (129, 3, 29, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (130, 3, 8, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (131, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (132, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (133, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (134, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (135, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (136, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (137, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (138, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (139, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (140, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (141, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (142, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (143, 3, 7, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (144, 3, 1, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (145, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (146, 3, 21, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (147, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (148, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (149, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (150, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (151, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (152, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (153, 3, 17, '2024-06-05');
INSERT INTO `inv_visualizaciones` VALUES (154, 3, 17, '2024-06-05');

-- ----------------------------
-- Table structure for log_tipousuario
-- ----------------------------
DROP TABLE IF EXISTS `log_tipousuario`;
CREATE TABLE `log_tipousuario`  (
  `idtipousuario` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idtipousuario`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_tipousuario
-- ----------------------------
INSERT INTO `log_tipousuario` VALUES (1, 'CLIENTE', 'S');
INSERT INTO `log_tipousuario` VALUES (2, 'SISTEMAS', 'S');

-- ----------------------------
-- Table structure for log_usuarios
-- ----------------------------
DROP TABLE IF EXISTS `log_usuarios`;
CREATE TABLE `log_usuarios`  (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidopaterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `apellidomaterno` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idtipousuario` int NOT NULL,
  `fecharegistro` date NOT NULL,
  `telefono` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `fechanacimiento` date NULL DEFAULT NULL,
  `activo` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idusuario`) USING BTREE,
  INDEX `idtipousuario`(`idtipousuario`) USING BTREE,
  CONSTRAINT `log_usuarios_ibfk_1` FOREIGN KEY (`idtipousuario`) REFERENCES `log_tipousuario` (`idtipousuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of log_usuarios
-- ----------------------------
INSERT INTO `log_usuarios` VALUES (1, 'abrahamvillalobos3656@gmail.com', '12345678', 'JESUS ABRAHAM', 'VILLALOBOS', 'FONSECA', 2, '2024-03-07', '6681939669', '2006-02-01', 'S');
INSERT INTO `log_usuarios` VALUES (3, 'juan@gmail.com', 'juan', 'juan antonio', 'pancho', 'moctezuma', 1, '2024-03-21', '6681939668', '2003-02-01', 'S');
INSERT INTO `log_usuarios` VALUES (4, 'diana.camacho@uas.edu.mx', 'diana123', 'diana', 'camacho', 'flores', 1, '2024-05-24', NULL, NULL, 'S');
INSERT INTO `log_usuarios` VALUES (5, 'pene@gmail.com', 'pene', 'ana', 'penote', 'penito', 1, '2024-05-31', '6681939669', '1900-02-01', 'S');

-- ----------------------------
-- Table structure for ven_carrodecompra
-- ----------------------------
DROP TABLE IF EXISTS `ven_carrodecompra`;
CREATE TABLE `ven_carrodecompra`  (
  `idlista` int NOT NULL AUTO_INCREMENT,
  `idusuario` int NOT NULL,
  `idlibro` int NOT NULL,
  `cantidad` int NOT NULL,
  `activo` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idlista`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 93 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ven_carrodecompra
-- ----------------------------
INSERT INTO `ven_carrodecompra` VALUES (86, 6, 12, 1, 'S');

-- ----------------------------
-- Table structure for ven_ventad
-- ----------------------------
DROP TABLE IF EXISTS `ven_ventad`;
CREATE TABLE `ven_ventad`  (
  `iddetalle` int NOT NULL AUTO_INCREMENT,
  `idventa` int NOT NULL,
  `idlibro` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio` float(32, 0) NOT NULL,
  `descuento` float(32, 0) NOT NULL,
  `iva` float(32, 0) NOT NULL,
  `total` float(32, 0) NOT NULL,
  PRIMARY KEY (`iddetalle`) USING BTREE,
  INDEX `idventa`(`idventa`) USING BTREE,
  INDEX `idlibro`(`idlibro`) USING BTREE,
  CONSTRAINT `ven_ventad_ibfk_1` FOREIGN KEY (`idventa`) REFERENCES `ven_ventam` (`idventa`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ven_ventad_ibfk_2` FOREIGN KEY (`idlibro`) REFERENCES `cat_libros` (`idlibro`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ven_ventad
-- ----------------------------
INSERT INTO `ven_ventad` VALUES (1, 12, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (2, 12, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (3, 12, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (4, 12, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (5, 13, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (6, 13, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (7, 14, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (8, 14, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (9, 15, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (10, 15, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (11, 16, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (12, 16, 5, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (13, 17, 1, 5, 100, 0, 16, 580);
INSERT INTO `ven_ventad` VALUES (14, 18, 1, 3, 100, 0, 16, 348);
INSERT INTO `ven_ventad` VALUES (15, 19, 1, 1, 100, 0, 16, 116);
INSERT INTO `ven_ventad` VALUES (16, 20, 3, 1, 120, 0, 16, 136);
INSERT INTO `ven_ventad` VALUES (17, 21, 17, 1, 300, 30, 43, 313);
INSERT INTO `ven_ventad` VALUES (18, 21, 18, 1, 350, 35, 50, 365);
INSERT INTO `ven_ventad` VALUES (19, 21, 20, 1, 500, 50, 72, 522);
INSERT INTO `ven_ventad` VALUES (20, 22, 1, 1, 100, 0, 16, 116);
INSERT INTO `ven_ventad` VALUES (21, 22, 7, 1, 450, 50, 64, 464);
INSERT INTO `ven_ventad` VALUES (22, 22, 29, 1, 600, 60, 86, 626);
INSERT INTO `ven_ventad` VALUES (23, 22, 30, 1, 700, 70, 101, 731);
INSERT INTO `ven_ventad` VALUES (24, 23, 17, 6, 300, 30, 43, 1878);
INSERT INTO `ven_ventad` VALUES (25, 23, 21, 1, 550, 55, 79, 574);

-- ----------------------------
-- Table structure for ven_ventam
-- ----------------------------
DROP TABLE IF EXISTS `ven_ventam`;
CREATE TABLE `ven_ventam`  (
  `idventa` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time(0) NOT NULL,
  `idusuariocompra` int NOT NULL,
  `idvendedor` int NOT NULL,
  `importe` float(32, 0) NOT NULL,
  `descuento` float(32, 0) NOT NULL,
  `iva` float(32, 0) NOT NULL,
  `total` float(32, 0) NOT NULL,
  `idestadoentrega` int NOT NULL,
  `idordenpaypal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`idventa`) USING BTREE,
  INDEX `idestadoentrega`(`idestadoentrega`) USING BTREE,
  INDEX `idusuario`(`idusuariocompra`) USING BTREE,
  CONSTRAINT `ven_ventam_ibfk_1` FOREIGN KEY (`idestadoentrega`) REFERENCES `conf_estadoentrega` (`idestadoentrega`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `ven_ventam_ibfk_2` FOREIGN KEY (`idusuariocompra`) REFERENCES `log_usuarios` (`idusuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ven_ventam
-- ----------------------------
INSERT INTO `ven_ventam` VALUES (9, '2024-05-30', '08:55:34', 3, 0, 1000, 50, 152, 1102, 1, '9V342757XP1759531');
INSERT INTO `ven_ventam` VALUES (10, '2024-05-30', '08:56:46', 3, 0, 1000, 50, 152, 1102, 1, '76B277858V9338455');
INSERT INTO `ven_ventam` VALUES (11, '2024-05-30', '08:57:25', 3, 0, 1000, 50, 152, 1102, 1, '7UE55489EV5616149');
INSERT INTO `ven_ventam` VALUES (12, '2024-05-30', '08:58:16', 3, 0, 1000, 50, 152, 1102, 1, '70C85178E4765164G');
INSERT INTO `ven_ventam` VALUES (13, '2024-05-30', '09:01:17', 3, 0, 1000, 50, 152, 1102, 1, '8DF61942PY573005B');
INSERT INTO `ven_ventam` VALUES (14, '2024-05-30', '09:01:49', 3, 0, 1000, 50, 152, 1102, 1, '3GM67763B03561839');
INSERT INTO `ven_ventam` VALUES (15, '2024-05-30', '09:03:47', 3, 0, 1000, 50, 152, 1102, 1, '2SF81114HA985354J');
INSERT INTO `ven_ventam` VALUES (16, '2024-05-30', '09:16:05', 3, 0, 1000, 50, 152, 1102, 1, '2BX54661FE1181707');
INSERT INTO `ven_ventam` VALUES (17, '2024-05-30', '00:33:52', 3, 0, 500, 0, 80, 580, 1, '86T48448663818349');
INSERT INTO `ven_ventam` VALUES (18, '2024-05-30', '00:37:06', 3, 0, 300, 0, 48, 348, 1, '57K76894PT1041206');
INSERT INTO `ven_ventam` VALUES (19, '2024-05-30', '00:37:45', 3, 0, 100, 0, 16, 116, 1, '4JH747967G0042027');
INSERT INTO `ven_ventam` VALUES (20, '2024-05-30', '11:28:05', 3, 0, 120, 0, 16, 136, 1, '11C64981MY677440G');
INSERT INTO `ven_ventam` VALUES (21, '2024-05-30', '11:36:01', 3, 0, 1150, 115, 165, 1200, 1, '4WV6119156986091T');
INSERT INTO `ven_ventam` VALUES (22, '2024-06-05', '17:24:02', 3, 0, 1850, 180, 267, 1937, 1, '5T281988UU016152X');
INSERT INTO `ven_ventam` VALUES (23, '2024-06-05', '19:16:38', 3, 1, 2350, 235, 337, 2452, 2, '32R95402VX527683C');

SET FOREIGN_KEY_CHECKS = 1;
