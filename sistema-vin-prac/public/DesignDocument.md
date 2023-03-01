# Sistema Vin-Prac
Author(s): [Carlos Valladarez](https://github.com/chey3002)

Status: Draft

Última actualización: 2023-02-27

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
- Crear un crud de estudiantes y de proyectos, diferenciando cuando sea uno de practicas, y uno de vinculación
- Crear una funcionalidad en la cual subiendo un archivo csv, o excel se creen de forma automática los estudiantes
- Asignar estudiantes a los diferentes proyectos
- Generar documentos con los datos de los estudiantes (31,32 y 39)
- Guardar documentos subidos por los estudiantes y docentes encargados (32-39)
- Semaforizar a los estudiantes para representar de forma visual que no se a entregado aun la documentación correspondiente, poniendo en verde si se encuentra a más de una semana de la fecha pactada, amarillo, si es de una semana a 3 días, y rojo para los 3 ultimos días, o si se pasaron de tiempo
- Descargar dichos documentos

## Non-Goals
- Automatizar completamente el proceso, el objetivo del proyecto es agilizar el proceso, mas nó automatizarlos por completo
- Abrir los documentos y editarlos en línea, el sistema sólo servirá como un repositorio.


## Background
Actualmente los procesos de generación, revisión y entrega de la documentación tanto de prácticas, como de vinculación se realizan de forma manual, y presencial, tomando tiempo tanto de estudiantes como de docentes.

## Overview
Para empezar debemos realizar los crud tanto de estudiantes como de proyectos, dada la estructura que se nos presenta considero que lo más conveniente es utilizar una base de datos relacional, ya que una no relacional realmente no hace sentido.
Para leer el archivo de excel podemos utilizar la librería
 [XSLX](https://www.npmjs.com/package/xlsx) en este [vídeo](https://www.youtube.com/watch?v=N42gydeIoQA) podemos observar como se hace el fetch de estos datos.
En cuanto a la asignación de estudiantes se puede realizar una tabla para esto, ya que es una relación n a n, simplemente juntando el id del estudiante, su cédula, con el id del proyecto.
para generar el archivo excel podemos realizarlo de forma sencilla utilizando la librería [react-export-excel](https://www.npmjs.com/package/react-export-excel) como se ve en el siguiente [vídeo](https://www.youtube.com/watch?v=FisPSnksObo)

En cuanto a los archivos de word no se ha encontrado una forma de crearlos,lo más sencillo sería generar archivos txt con el texto solo para que los estudiantes copien y peguen esta información en sus documentos, pero esto queda **pospuesto para ser revisado posteriormente.**

los archivos a subir tendrán el siguiente formato [Nro de documento]-[Número de cédula del estudiante]-[nombre completo del estudiante].doc, por ejemplo:
"39-0105599385-CarlosAlbertoValladarezBriones.doc" para ser localizados con mayor facilidad. La forma de subir los archivos al servidor y guardarlos quedará temporalmente **pospuesto** hasta que se realice esta parte. Una vez subidos los archivos hay que exponerlos para su posterior descarga.

La semaforización es solo cambiar un estilo de css, así que no debería ser muy complicado.


## Tecnologías a utilizar

### FrontEnd:
- Next.js: es un framework basado en React, el cual nos permite trabajar con mayor facilidad.
- css: se han contemplado las siguientes opciones:
    - tailwind: permite crear diseños bastante vistosos con facilidad, pero resulta bastante verboso, y puede llegar a confundir si alguien quiere revisar el código posteriormente.
    - react-bootstrap: Es un set de componentes de react, basado en bootstrap, el cual permite crear interfaces con gran facilidad y rapidez.
    - chacraUI: es similar a react-bootstrap pero aparentemente cuenta con menor comunidad lo cual puede retrasar el desarrollo
- finalmente se decidió  utilizar **react-bootstrap** junto a estilos de css puro para algunos detalles. Para realizar la lectura de los formularios se realizará con el sigueinte [video](https://www.youtube.com/watch?v=PCZ-ByiRxT8)
- adicionalmente se decidió  utilizar [react-pro-sidebar](https://www.npmjs.com/package/react-pro-sidebar) para una parte de la ui ya que permite generar un menú  lateral de forma sencilla
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
  - Para realizar esta conección se utilizó el paquete [mysql2](https://www.npmjs.com/package/mysql2), el cual permite realizar consultas asincronas.
- De forma predeterminada, Next.js incluye su propio servidor con "next start". Si tiene un backend existente, aún puede usarlo con Next.js (este no es un servidor personalizado). Un servidor Next.js personalizado le permite iniciar un servidor 100% programáticamente para usar patrones de servidor personalizados. La mayoría de las veces, no necesitará esto, pero está disponible para una personalización completa. de momento se utilizará el backend de next.js
esta será una REST api, la cual se conectará con la base de datos.
## Detailed Design

### Diagrama entidad relación
![entidad relación](Recursos/Diagrama%20entidad%20relación.png)

## Consideraciones
- La siguiente persona que tenga que encargarse del proyecto  deberá aprender React.js y Next.js así como un poco de bootstrap para poder utilizar los componentes de react bootstrap con facilidad, ya que son tecnologías que personalmente no he visto sean vistas en la universidad, pero son tecnologías que son muy buenas y bastante utilizadas a nivel mundial por lo cual vale la pena el esfuerzo extra.

