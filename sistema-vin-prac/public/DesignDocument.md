# Sistema Vin-Prac
Author(s): [Carlos Valladarez](https://github.com/chey3002)

Última actualización: 2023-Marzo-15

Repositorio: [Github](https://github.com/chey3002/Vin-Prac)

## Contenido
- Objetivo
- Goals
- Non-Goals
- Background
- Overview
- Tecnologías a utilizar
- Detailed Design
- Consideraciones


## Objetivo
El presente repositorio corresponde al trabajo de prácticas internas realizado por Carlos Valladarez para la Universidad Católica de Cuenca.
El objetivo del proyecto es realizar un sistema que permita agilizar los procesos de las prácticas laborales, como de vinculación con la sociedad.
Se requiere automatizar, parcialmente, el proceso de vinculación y prácticas, permitiendo registrar a los estudiantes, tanto manualmente, como de forma automatizada, así como registrar los proyectos de vinculación y prácticas pre profesionales. Hecho esto se podrá asignar los estudiantes a los proyectos.
Una vez asignados los estudiantes y docentes encargados de los proyectos podrán cargar la documentación de las prácticas, hecho esto, los docentes encargados deberán asignar una fecha de entrega, la cual se mostrará de forma semaforizada dependiendo de la fecha de entrega de los documentos y la fecha actual.
se busca automatizar los documentos 31, 32, y 39 por parte de los docentes, para esto se busca que se puedan generar estos archivos (excel, y docs) de manera autónoma,así como permitir que los estudiantes suban los documentos de la documentación llenado por su parte de la 32 - 39.



## Goals
[x] Crear un crud de estudiantes y de proyectos, diferenciando cuando sea uno de practicas, y uno de vinculación

[x] Crear una funcionalidad en la cual subiendo un archivo csv, o excel se creen de forma automática los estudiantes

[x] Asignar estudiantes a los diferentes proyectos

[x] Generar documentos con los datos de los estudiantes (31,32 y 39)

[x] Guardar documentos subidos por los estudiantes y docentes encargados (32-39)

[x] Semaforizar a los estudiantes para representar de forma visual que no se a entregado aun la documentación correspondiente, poniendo en verde si se encuentra a más de una semana de la fecha pactada, amarillo, si es de una semana a 3 días, y rojo para los 3 últimos días, o si se pasaron de tiempo

[X] Descargar dichos documentos

## Non-Goals
- Automatizar completamente el proceso, el objetivo del proyecto es agilizar el proceso, mas nó automatizarlos por completo
- Abrir los documentos y editarlos en línea, el sistema sólo servirá como un repositorio.


## Background
Actualmente los procesos de generación, revisión y entrega de la documentación tanto de prácticas, como de vinculación se realizan de forma manual, y presencial, tomando tiempo tanto de estudiantes como de docentes.

## Overview
Para empezar debemos realizar los crud tanto de estudiantes como de proyectos, dada la estructura que se nos presenta considero que lo más conveniente es utilizar una base de datos relacional, ya que una no relacional realmente no hace sentido.
Para leer el archivo se optó por utilizar la librería
 [convert-csv-to-json](https://www.npmjs.com/package/convert-csv-to-json?activeTab=readme), este nos permite leer el archivo csv, y transformarlo al formato json deseado de forma muy sencilla, además de esto permite realizar la misma acción con el texto plano del csv lo cual permite cumplir fácilmente nuestro objetivo.
En cuanto a la asignación de estudiantes se puede realizar una tabla para esto, ya que es una relación n a n, simplemente juntando el id del estudiante, su cédula, con el id del proyecto.
para generar el archivo excel podemos realizarlo utilizando la librería [xlsx](https://www.npmjs.com/package/react-export-excel) como se ve en el siguiente [vídeo](https://www.youtube.com/watch?v=F7dQLO5Jhp4)

En cuanto a los archivos de word se encontró, la librería [docx.js](https://www.npmjs.com/package/docx), el cual permite generar documentos de word (docx) con un de árbol de objetos, la [documentación](https://docx.js.org/#/?id=welcome) realmente es bastante buena y contiene bastantes ejemplos de como utilizarlo.

los archivos a subir tendrán el siguiente formato [id de asignación]-[Número de cédula del estudiante]-[número de documento].doc, por ejemplo:
"1-0105599385-39.doc" para ser localizados con mayor facilidad. los archivos se subirán a la carpeta public del proyecto. Una vez subidos los archivos hay que exponerlos para su posterior descarga. PAra esto se utilizó la librería [formidable](https://www.npmjs.com/package/formidable), que permite leer y guardar los archivos en la carpeta public.

La semaforización es solo cambiar un estilo de css, así que no debería ser muy complicado.
## Instalación
1) cd sistema-vin-prac
2) npm install
3) npm run dev

## Tecnologías a utilizar

### FrontEnd:
- Next.js: es un framework basado en React, el cual nos permite trabajar con mayor facilidad.
- css: se han contemplado las siguientes opciones:
    - tailwind: permite crear diseños bastante vistosos con facilidad, pero resulta bastante verboso, y puede llegar a confundir si alguien quiere revisar el código posteriormente.
    - react-bootstrap: Es un set de componentes de react, basado en bootstrap, el cual permite crear interfaces con gran facilidad y rapidez.
    - chacraUI: es similar a react-bootstrap pero aparentemente cuenta con menor comunidad lo cual puede retrasar el desarrollo
- finalmente se decidió  utilizar **react-bootstrap** junto a estilos de css puro para algunos detalles. Para realizar la lectura de los formularios se realizará con el siguiente [video](https://www.youtube.com/watch?v=PCZ-ByiRxT8)
- Para las tables se utilizará [Ant Design](https://www.npmjs.com/package/antd) ya que permite realizar tablas basándonos en json, utilizando otro json que nos permite especificar las columnas de la tabla.
- adicionalmente se decidió  utilizar [react-pro-sidebar](https://www.npmjs.com/package/react-pro-sidebar) para una parte de la ui ya que permite generar un menú  lateral sin mucha dificultad.
- Para realizar un dropdown con búsqueda se utilizo la librería [React Select](https://react-select.com/home)

#### Paleta de colores:
![paleta de colores](./Recursos/Shades%20of%20Wine%20Color%20Palette%20-%20color-hex.com.png)

 | Hex     | RGB         |
 |---------|-------------|
 | #b9282c | (185,40,44) |
 | #9e2233 | (158,34,51) |
 | #841b3a | (132,27,58) |
 | #691540 | (105,21,64) |
 | #4e0e47 | (78,14,71) |

### Backend:
- Se optó por MariaDB, ya que es una base de datos SQL muy similar a MYSQL la cual es abierta, y fácil  de utilizar. (XAMP)
  - Para realizar esta conexión se utilizó el paquete [mysql2](https://www.npmjs.com/package/mysql2), el cual permite realizar consultas asíncronas.
- De forma predeterminada, Next.js incluye su propio servidor con "next start". Si tiene un backend existente, aún puede usarlo con Next.js (este no es un servidor personalizado). Un servidor Next.js personalizado le permite iniciar un servidor 100% programáticamente para usar patrones de servidor personalizados. La mayoría de las veces, no necesitará esto, pero está disponible para una personalización completa. Se utilizará el backend de next.js, esta será una REST api, la cual se conectará con la base de datos.
## Detailed Design

### Diagrama entidad relación
![entidad relación](Recursos/Diagrama%20entidad%20relaci%C3%B3n-final.png)
### Instrucciones para crear un archivo csv
1) El archivo debe tener en la primera fila los campos: "cedula",	"nombre_completo",	"ciclo", y	"unidad_academica"
2) La columna "cedula" debe tener como formato Texto
![paso 2](Recursos/instrucciones%201.png)
3) Para guardar el archivo debemos ir a guardar como, y al momento de guardar el archivo debemos poner en **Tipo** "CSV UTF-8 (delimitado por comas)"
![paso 3](Recursos/instrucciones%202.png)

## Consideraciones
- La siguiente persona que tenga que encargarse del proyecto  deberá aprender React.js y Next.js así como un poco de bootstrap para poder utilizar los componentes de react bootstrap con facilidad, ya que son tecnologías que personalmente no he visto sean vistas en la universidad, pero son tecnologías que son muy buenas y bastante utilizadas a nivel mundial por lo cual vale la pena el esfuerzo extra.

## Avances:
### Semana 1
Se realizaron las siguientes actividades:
- Se realizó el documento de diseño, así como se diseño la base de datos
- Se implementó la interfaz gráfica básica
![interfaz](Recursos/interfaz%20b%C3%A1sica.png)
- Se Creó un crud de estudiantes, proyectos, y las asignaciones de estudiantes a proyectos (Backend, y frontend)
- Se implementó la semaforización de las asignaciones por fecha
- Se implementó una barra de búsqueda para las tablas del crud.
#### Estudiantes:
![interfaz](Recursos/Estudiantes1.png)
![interfaz](Recursos/Estudiantes2.png)
![interfaz](Recursos/Estudiantes3.png)
#### Proyectos:
![interfaz](Recursos/Proyectos1.png)
![interfaz](Recursos/Proyectos2.png)
![interfaz](Recursos/Proyectos3.png)
#### Asignaciones:
![interfaz](Recursos/Asignaciones1.png)
![interfaz](Recursos/Asignaciones2.png)
![interfaz](Recursos/Asignaciones3.png)
### Semana 2
Se realizaron las siguientes actividades:
- Se realizó una funcionalidad en la cual subiendo un archivo csv, se creen de forma automática los estudiantes
- Se implementó la generación del documento 31
![generación de documento 31](Recursos/Generacion%20de%20archivo%2031.png)
![Excel31](Recursos/excel%2031.png)
- Se implementó la subida de documentos (32-39) para cada asignación realizada
- se implementó un sistema de descarga para dichos documentos
  ![subida y descarga de documentos](Recursos/Subida%20y%20descarga%20de%20archivos.png)
### Semana 3
Se realizaron las siguientes actividades:
- Implementación de generación de documentos 32, y 39
![Generación de documentos 32 y 39](Recursos/Generacion%20de%20archivos%2032%20y%2039.png)
