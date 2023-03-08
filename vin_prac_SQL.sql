-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2023 a las 16:44:11
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
  MODIFY `id_ep` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
