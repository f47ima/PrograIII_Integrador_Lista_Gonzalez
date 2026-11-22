-- Base de datos del TP Integrador: Hojas & Viñetas (libros y cómics)
-- Estructura basada en BBDD/tp25_autoservicio.sql.
-- Importar desde phpMyAdmin: crear la base `hojas_vinetas` y usar la pestaña Importar.

SET NAMES utf8mb4;
SET time_zone = "-03:00";

-- --------------------------------------------------------
-- Tabla products
-- --------------------------------------------------------
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `author` varchar(120) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` enum('libro','comic') NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `products` (`id`, `name`, `author`, `image`, `category`, `price`, `active`) VALUES
(1, 'Rayuela', 'Julio Cortázar', '/img/productos/rayuela.jpg', 'libro', 18500.00, 1),
(2, 'Ficciones', 'Jorge Luis Borges', '/img/productos/ficciones.jpg', 'libro', 15900.00, 1),
(3, 'Cien años de soledad', 'Gabriel García Márquez', '/img/productos/cien-anos-de-soledad.jpg', 'libro', 21000.00, 1),
(4, 'El túnel', 'Ernesto Sabato', '/img/productos/el-tunel.jpg', 'libro', 12800.00, 1),
(5, 'Fahrenheit 451', 'Ray Bradbury', '/img/productos/fahrenheit-451.jpg', 'libro', 16400.00, 1),
(6, '1984', 'George Orwell', '/img/productos/1984.jpg', 'libro', 17200.00, 1),
(7, 'El principito', 'Antoine de Saint-Exupéry', '/img/productos/el-principito.jpg', 'libro', 9900.00, 1),
(8, 'Martín Fierro', 'José Hernández', '/img/productos/martin-fierro.jpg', 'libro', 11500.00, 1),
(9, 'Dune', 'Frank Herbert', '/img/productos/dune.jpg', 'libro', 24900.00, 1),
(10, 'Orgullo y prejuicio', 'Jane Austen', '/img/productos/orgullo-y-prejuicio.jpg', 'libro', 13900.00, 1),
(11, 'Sapiens', 'Yuval Noah Harari', '/img/productos/sapiens.jpg', 'libro', 26500.00, 1),
(12, 'El Aleph', 'Jorge Luis Borges', '/img/productos/el-aleph.jpg', 'libro', 14700.00, 1),
(13, 'Crimen y castigo', 'Fiódor Dostoievski', '/img/productos/crimen-y-castigo.jpg', 'libro', 19800.00, 0),
(14, 'Mafalda: Todas las tiras', 'Quino', '/img/productos/mafalda-todas-las-tiras.jpg', 'comic', 32000.00, 1),
(15, 'El Eternauta', 'H. G. Oesterheld y F. Solano López', '/img/productos/el-eternauta.jpg', 'comic', 28500.00, 1),
(16, 'Watchmen', 'Alan Moore y Dave Gibbons', '/img/productos/watchmen.jpg', 'comic', 34900.00, 1),
(17, 'Maus', 'Art Spiegelman', '/img/productos/maus.jpg', 'comic', 27800.00, 1),
(18, 'Batman: Año Uno', 'Frank Miller y David Mazzucchelli', '/img/productos/batman-ano-uno.jpg', 'comic', 19500.00, 1),
(19, 'One Piece Vol. 1', 'Eiichiro Oda', '/img/productos/one-piece-vol-1.jpg', 'comic', 8900.00, 1),
(20, 'Dragon Ball Vol. 1', 'Akira Toriyama', '/img/productos/dragon-ball-vol-1.jpg', 'comic', 8500.00, 1),
(21, 'Persépolis', 'Marjane Satrapi', '/img/productos/persepolis.jpg', 'comic', 23600.00, 1),
(22, 'Sandman Vol. 1', 'Neil Gaiman', '/img/productos/sandman-vol-1.jpg', 'comic', 29900.00, 1),
(23, 'Spider-Man: Azul', 'Jeph Loeb y Tim Sale', '/img/productos/spider-man-azul.jpg', 'comic', 18900.00, 1),
(24, 'Astérix el galo', 'Goscinny y Uderzo', '/img/productos/asterix-el-galo.jpg', 'comic', 15200.00, 1),
(25, 'Patoruzito Vol. 1', 'Dante Quinterno', '/img/productos/patoruzito-vol-1.jpg', 'comic', 12300.00, 1),
(26, 'Akira Vol. 1', 'Katsuhiro Otomo', '/img/productos/akira-vol-1.jpg', 'comic', 25400.00, 0);

-- --------------------------------------------------------
-- Tabla users (vacía: el admin se crea con POST /api/users)
-- --------------------------------------------------------
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabla sales
-- --------------------------------------------------------
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total_price` decimal(10,2) NOT NULL,
  `user_name` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabla product_sales (intermedia: relación muchos a muchos)
-- --------------------------------------------------------
CREATE TABLE `product_sales` (
  `product_id` int NOT NULL,
  `sale_id` int NOT NULL,
  KEY `product_id` (`product_id`),
  KEY `sale_id` (`sale_id`),
  CONSTRAINT `product_sales_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_sales_ibfk_2` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
