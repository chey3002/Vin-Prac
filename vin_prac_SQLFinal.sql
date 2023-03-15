-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-03-2023 a las 23:49:53
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vin_prac`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `cedula` varchar(255) NOT NULL,
  `ciclo` int(2) NOT NULL,
  `nombre_completo` varchar(255) NOT NULL,
  `unidad_academica` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`cedula`, `ciclo`, `nombre_completo`, `unidad_academica`) VALUES
('0105599385', 5, 'Carlos Alberto Valladarez Briones', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599386', 5, 'Briley Ramirez', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599387', 5, 'Tripp Yang', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599388', 5, 'Zaria Patterson', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599389', 5, 'Alisson Forbes', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599390', 5, 'Lilah Oneill', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599391', 5, 'Destiney Buchanan', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599392', 5, 'Marlene Escobar', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599393', 5, 'Maggie Burgess', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599394', 5, 'Elisa Mcdonald', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599395', 5, 'Khloe Morton', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599396', 5, 'Whitney Harmon', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599397', 5, 'Elisabeth Lam', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599398', 5, 'Giovanni Hanson', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599399', 5, 'Jaydon Mcmillan', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599400', 5, 'Ari Manning', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599401', 5, 'Jan Mendoza', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599402', 5, 'Caden Mccarty', 'Informática, Ciencias de la Computación, e Innovación Tecnológica'),
('0105599403', 5, 'Evelyn Cunningham', 'Informática, Ciencias de la Computación, e Innovación Tecnológica');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes_proyectos`
--

CREATE TABLE `estudiantes_proyectos` (
  `id_ep` int(11) NOT NULL,
  `cedula` varchar(255) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `fecha_de_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `fecha_limite` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estudiantes_proyectos`
--

INSERT INTO `estudiantes_proyectos` (`id_ep`, `cedula`, `id_proyecto`, `fecha_de_creacion`, `fecha_limite`) VALUES
(1, '0105599387', 13, '2023-03-08 17:38:59', '2023-05-31'),
(2, '0105599385', 13, '2023-03-08 02:42:13', '2023-03-12'),
(3, '0105599401', 13, '2023-03-08 17:42:41', '2023-03-18'),
(4, '0105599390', 14, '2023-03-08 13:51:21', '2023-03-31'),
(5, '0105599402', 15, '2023-03-08 13:51:44', '2023-03-31'),
(6, '0105599386', 14, '2023-03-08 13:51:58', '2023-03-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `catedra_integradora` varchar(255) DEFAULT NULL,
  `proyecto_integrador` varchar(255) DEFAULT NULL,
  `proyecto_servicio_comunitario` varchar(255) DEFAULT NULL,
  `numero_de_horas_de_practicas` int(11) DEFAULT NULL,
  `numero_de_estudiantes_que_deben_hacer_las_practicas` int(11) DEFAULT NULL,
  `actividades_a_realizar` text DEFAULT NULL,
  `docente_tutor` varchar(255) NOT NULL,
  `instituciones_o_empresas` varchar(255) NOT NULL,
  `propuesta_en_la_que_va_a_participar` text DEFAULT NULL,
  `encargado_en_la_empresa` varchar(255) DEFAULT NULL,
  `tipo_de_proyecto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `catedra_integradora`, `proyecto_integrador`, `proyecto_servicio_comunitario`, `numero_de_horas_de_practicas`, `numero_de_estudiantes_que_deben_hacer_las_practicas`, `actividades_a_realizar`, `docente_tutor`, `instituciones_o_empresas`, `propuesta_en_la_que_va_a_participar`, `encargado_en_la_empresa`, `tipo_de_proyecto`) VALUES
(13, 'nose', 'N/A', 'N/A', 120, 3, 'Actividades de actualización', 'Ing. Poma', 'Ucacue', 'texto aquí', 'asdasdasd asdasd asdas', 'Practicas'),
(14, 'nose', 'N/A', 'N/A', 120, 1, 'otras actividades', 'Ing. V', 'Banco del austo', 'otras actividades', '11', 'Practicas'),
(15, 'nose', 'N/A', 'N/A', 120, 2, 'mas actividades', 'Ing. Poma', 'Banco del austo', 'mas actividades', 'asdasdasd asdasd asdas', 'Vinculación');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`cedula`);

--
-- Indices de la tabla `estudiantes_proyectos`
--
ALTER TABLE `estudiantes_proyectos`
  ADD PRIMARY KEY (`id_ep`),
  ADD KEY `cedula` (`cedula`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estudiantes_proyectos`
--
ALTER TABLE `estudiantes_proyectos`
  MODIFY `id_ep` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes_proyectos`
--
ALTER TABLE `estudiantes_proyectos`
  ADD CONSTRAINT `estudiantes_proyectos_ibfk_1` FOREIGN KEY (`cedula`) REFERENCES `estudiantes` (`cedula`),
  ADD CONSTRAINT `estudiantes_proyectos_ibfk_2` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
