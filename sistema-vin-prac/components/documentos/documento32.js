import React from 'react'
import { Document, Footer, Header, Packer, Paragraph, Table, TableCell, TableRow, ImageRun, WidthType, TextRun, AlignmentType, PageNumber, HeightRule } from "docx";
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { saveAs } from "file-saver";

export default function Documento32({ estudiante_proyecto }) {
    const [documentState, setDocumentState] = React.useState({
        fecha: "",
        nombreRepresentanteLegal: "",
        cargoRepresentanteLegal: "",
        carrera: "",
        directorDeCarrera: "",
        nroOficio: "",
        areaDePracticas:""
    });
    const handleChange = (e) => {
        if (e.target.name === "fecha") {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value + "T12:00:00.000Z" })
        } else {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value })
        }

    }


 
    const handleGenerateDoc = async () => {
        if (documentState.fecha === "" || documentState.nombreRepresentanteLegal === "" || documentState.cargoRepresentanteLegal === "" || documentState.carrera === "" || documentState.directorDeCarrera === "" || documentState.nroOficio === "" || documentState.areaDePracticas=== "") {
            alert("Todos los campos son obligatorios para generar el documento 32")
            return;
        }
        //llamo a las imágenes del documento
        const logo = await fetch(
            "/Recursos/Logo-UC.png"
        ).then(r => r.blob());
        const footerImage = await fetch(
            "/Recursos/Footer-UC.png"
        ).then(r => r.blob());
        //Creo el header
        const header = new Header({
            children: [
                //creo la tabla del header
                new Table({
                    margins: { left: 0, right: 0 },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 24.9,
                                        type: WidthType.PERCENTAGE
                                    },
                                    children: [new Paragraph({
                                        children: [
                                            new ImageRun({
                                                data: logo,
                                                transformation: {
                                                    width: 169,
                                                    height: 50
                                                }
                                            })
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    })],
                                    verticalAlign: "center",
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "OFICIO DIRECCIÓN DE CARRERA",
                                                font: "Arial",
                                                bold: true,
                                                size: 22,
                                            })],
                                        font: "Arial",
                                        alignment: AlignmentType.CENTER,
                                        break: 1
                                    })],
                                    verticalAlign: "center",
                                    width: {
                                        size: 59.4,
                                        type: WidthType.PERCENTAGE
                                    },
                                    alignment: AlignmentType.CENTER,
                                }),
                                new TableCell({
                                    children: [new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "CÓDIGO: F- VS - 32",
                                                font: "Arial",

                                                size: 16,

                                            }),
                                            new TextRun({
                                                text: "VERSION: 01",
                                                break: 1,
                                                font: "Arial",

                                                size: 16,
                                            }),
                                            new TextRun({
                                                children: ["FECHA:", new Date(Date.parse(documentState.fecha )).toLocaleDateString(undefined, { timeZone: "America/Los_Angeles" }).replaceAll("/", "-")], 
                                                break: 1,
                                                font: "Arial",

                                                size: 16,
                                            }),
                                            new TextRun({
                                                children: ["Página ", PageNumber.CURRENT, " de ", PageNumber.TOTAL_PAGES],
                                                break: 1,
                                                font: "Arial",

                                                size: 16,

                                            }),
                                        ],
                                        width: {
                                            size: 15.7,
                                            type: WidthType.PERCENTAGE
                                        },
                                        alignment: AlignmentType.CENTER,
                                    })],
                                    verticalAlign: "center",
                                }),
                            ],
                            height: {
                                value: '2.2cm',
                                rule: HeightRule.EXACT
                            }
                        }),
                        // Agregar más filas según sea necesario
                    ],
                }),
            ],
        })
        //creo el footer del documento
        const footer = new Footer({
            children: [new Paragraph({
                children: [
                    new ImageRun({
                        data: footerImage,
                        transformation: {
                            width: 600,
                            height: 21
                        }
                    })
                ],
                alignment: AlignmentType.CENTER,
            })],
        })
        //creo el cuerpo del documento
        const bodyDocument = [new Paragraph({
            //Encabezado del documento
            children: [new TextRun({
                children: ["Cuenca, ", new Date(documentState.fecha ).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })],
                font: "Arial",
                break: 1,
                size: 20,
            }),
            new TextRun({
                children: ["Oficio de Secretaria de la Unidad Académica de ", estudiante_proyecto.estudiantes.unidad_academica, " ", "Nº ", documentState.nroOficio],
                font: "Arial",
                break: 1,
                size: 20,
            })
            ],
            spacing: {
                line: 360
            },
            alignment: AlignmentType.RIGHT
        }),
        //A quien va dirigido el documento
        new Paragraph({
            children: [new TextRun({
                text: documentState.nombreRepresentanteLegal,
                font: "Arial",
                break: 1,
                size: 20,
            }),
            new TextRun({
                text: documentState.cargoRepresentanteLegal,//"CARGO DEL REPRESENTANTE LEGAL
                font: "Arial",
                break: 1,
                bold: true,
                size: 20,
            }),
            new TextRun({
                text: "Su despacho.-",
                font: "Arial",
                break: 1,
                size: 20,
            })
            ],
            alignment: AlignmentType.LEFT
        }),
        //texto del documento
        new Paragraph({
            children: [new TextRun({
                children: ["Con un atento saludo me dirijo a usted para solicitarle de la manera más comedida autorice a ",
                    estudiante_proyecto.estudiantes.nombre_completo, ", con documento de identidad Nº ", estudiante_proyecto.estudiantes.cedula,
                    ", estudiante del ", estudiante_proyecto.estudiantes.ciclo,
                    " ciclo, de la carrera de ",
                    //carrera del estudiante
                    documentState.carrera,
                    ", de la Unidad Académica de ", estudiante_proyecto.estudiantes.unidad_academica,
                    " de la Universidad Católica de Cuenca, para que realice ",
                    estudiante_proyecto.proyectos.numero_de_horas_de_practicas.toString(), " horas correspondientes a las Prácticas Laborales en el área ",
                    //area de las practicas
                    documentState.areaDePracticas, " de su dependencia; siendo este requisito indispensable para cumplir con el Plan de Estudios de la Carrera. Pido de favor consignar su aceptación en el casillero del cuadro que se indica a continuación con firma y sello de la institución, e indicar el nombre del profesional que asignarán como tutor para el seguimiento de la práctica pre profesional por parte de su institución."],
                font: "Arial",
                break: 1,
                size: 20,
            }),
                new TextRun({
                    text: "",
                    font: "Arial",
                    break: 1,
                    size: 20,
                }),
            new TextRun({
                text: "Con sentimientos de consideración y estima, suscribo.",
                font: "Arial",
                break: 1,
                size: 20,
            })
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360
            }
        }),
        //Firma del director de carrera
        new Paragraph({
            children: [new TextRun({
                text: "Atentamente",
                font: "Arial",
                break: 1,
                size: 20,
            }),
            new TextRun({
                text: "DIOS, PATRIA, CULTURA Y DESARROLLO",
                font: "Arial",
                break: 1,
                size: 20,
            }),
            new TextRun({
                text: "_____________________________",
                font: "Arial",
                break: 6,
                size: 20,
            }),
            new TextRun({
                text: documentState.directorDeCarrera,
                font: "Arial",
                break: 1,
                size: 20,
            }),
            new TextRun({
                text: "DIRECTOR DE CARRERA",
                font: "Arial",
                break: 1,
                bold: true,
                size: 20,
            }),
            new TextRun({
                children: ["UNIDAD ACADÉMICA DE ", estudiante_proyecto.estudiantes.unidad_academica],
                font: "Arial",
                break: 1,
                size: 20,
                bold: true,
                allCaps: true,
            }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360
            }
        }),
        new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            rowSpan: 2,
                            shading: {
                                fill: "bdd6ee"
                            },
                            width: {
                                size: 37.7,
                                type: WidthType.PERCENTAGE
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "NOMBRE Y CARGO DE LA PERSONA QUE AUTORIZA",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
                        }),
                        new TableCell({
                            columnSpan: 2,
                            shading: {
                                fill: "bdd6ee"
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "AUTORIZACIÓN",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                            width: {
                                size: 17,
                                type: WidthType.PERCENTAGE
                            },
                            alignment: AlignmentType.CENTER,
                        }),
                        new TableCell({
                            rowSpan: 2,
                            shading: {
                                fill: "bdd6ee"
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "FIRMA Y SELLO DE LA INSTITUCIÓN",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    }),
                                ],
                                width: {
                                    size: 45.2,
                                    type: WidthType.PERCENTAGE
                                },
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                        }),
                    ],
                }),

                new TableRow({
                    children: [
                        new TableCell({
                            shading: {
                                fill: "bdd6ee"
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "SI",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                            width: {
                                size: 8.5,
                                type: WidthType.PERCENTAGE
                            },
                            alignment: AlignmentType.CENTER,
                        }),
                        new TableCell({
                            shading: {
                                fill: "bdd6ee"
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "NO",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    }),
                                ],
                                width: {
                                    size: 8.5,
                                    type: WidthType.PERCENTAGE
                                },
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                        }),
                    ],
                }),

                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 37.7,
                                type: WidthType.PERCENTAGE
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Nombre…………………………………",
                                        font: "Arial",
                                        size: 18,
                                        break: 2,
                                    }),
                                    new TextRun({
                                        text: "Cargo: …………………………………",
                                        font: "Arial",
                                        size: 18,
                                        break: 2,

                                    }),
                                    new TextRun({
                                        text: "",
                                        font: "Arial",
                                        size: 18,
                                        break: 1,

                                    })

                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                            width: {
                                size: 8.5,
                                type: WidthType.PERCENTAGE
                            },
                            alignment: AlignmentType.CENTER,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "",
                                        font: "Arial",
                                        bold: true,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                            width: {
                                size: 8.5,
                                type: WidthType.PERCENTAGE
                            },
                            alignment: AlignmentType.CENTER,
                        }),
                        new TableCell({
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "f. ……………………………………..",
                                        font: "Arial",
                                        size: 18,
                                        break: 4,
                                    }),
                                ],
                                width: {
                                    size: 45.2,
                                    type: WidthType.PERCENTAGE
                                },
                                alignment: AlignmentType.CENTER,
                            })],
                            verticalAlign: "center",
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            columnSpan: 4,
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Nombre del tutor que asigna la institución: …………………………………………………………………………….",
                                        font: "Arial",
                                        size: 18,
                                        break: 1,
                                    }),
                                ],
                            })],
                        }),
                    ],
                }),
            ],
        })
        ]
        //armo el documento
        let doc = new Document({
            sections: [
                {
                    headers: {
                        default: header,
                    },
                    footers: {
                        default: footer,
                    },
                    children: bodyDocument
                },
            ],
        });
        Packer.toBlob(doc).then(blob => {
            saveAs(blob, estudiante_proyecto.estudiantes.cedula+"-Documento32.docx");
        });
    }
    return (
        <Container style = {{ marginTop: "10px", marginBottom: "10px" }} >
            <h3>
                Generar Documento 32
            </h3>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Nombre del representante legal</ Form.Label >
                        < Form.Control name="nombreRepresentanteLegal" type="text " placeholder="Nombre del representante legal" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Cargo del representante legal</ Form.Label >
                        < Form.Control name="cargoRepresentanteLegal" type="text " placeholder="Cargo del representante legal" onChange={handleChange} />
                    </ Form.Group >
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Area donde se efectuaran las practicas</ Form.Label >
                        < Form.Control name="areaDePracticas" type="text " placeholder="Area en la cual se efectuaran las practicas" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                </Col>

            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Carrera del estudiante</ Form.Label >
                        < Form.Control name="carrera" type="text " placeholder="Carrera" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Director de carrera </ Form.Label >
                        < Form.Control name="directorDeCarrera" type="text " placeholder="Director de carrera" onChange={handleChange} />
                    </ Form.Group >
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Fecha del documento </ Form.Label >
                        < Form.Control name="fecha" type="date" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Oficio número de documento </ Form.Label >
                        < Form.Control name="nroOficio" type="text" placeholder="Número de oficio" onChange={handleChange} />
                    </ Form.Group >
                </Col>
            </Row>
            <Row style={{marginTop:"10px"}}>
                <Col lg={true}>
                    <Button variant='primary' onClick={handleGenerateDoc}>

                        <span style={{ display: "grid", gridTemplateColumns: "auto auto", placeItems: "center", columnGap: "5px" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark-word" viewBox="0 0 16 16">
                                <path d="M5.485 6.879a.5.5 0 1 0-.97.242l1.5 6a.5.5 0 0 0 .967.01L8 9.402l1.018 3.73a.5.5 0 0 0 .967-.01l1.5-6a.5.5 0 0 0-.97-.242l-1.036 4.144-.997-3.655a.5.5 0 0 0-.964 0l-.997 3.655L5.485 6.88z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg>
                            Descargar
                        </span>

                    </Button>
                </Col>
            </Row>
        </Container>
);

}


