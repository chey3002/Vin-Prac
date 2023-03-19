import React from 'react'
import { Document, Footer, Header, Packer, Paragraph, Table, TableCell, TableRow, ImageRun, WidthType, TextRun, AlignmentType, PageNumber, HeightRule } from "docx";
import { Button,  Col, Container, Form, Row } from 'react-bootstrap';
import { saveAs } from "file-saver";

export default function Documento39({ estudiante_proyecto }) {
    const [documentState, setDocumentState] = React.useState({
        carrera: "",
        directorDeCarrera: "",
        fecha: "",
        fechaInicio: "",
        fechaFin: "",
        pronombreEstudiante: "",
        matriz: "",
        ciudad: "",
    });
    const tipoDeDocumento = (estudiante_proyecto.proyectos.tipo_de_proyecto === "Practicas") ? "Prácticas Laborales" : "Servicio Comunitario"
    const handleChange = (e) => {
        if (e.target.name === "fecha" || e.target.name === "fechaInicio"|| e.target.name === "fechaFin") {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value + "T12:00:00.000Z" })
        } else {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value })
        }

    }



    const handleGenerateDoc = async () => {
        if (documentState.carrera === "" || documentState.directorDeCarrera === "" || documentState.fecha === "" || documentState.fechaInicio === "" || documentState.fechaFin === "" || documentState.pronombreEstudiante === "" || documentState.matriz === "" || documentState.ciudad === "") {
            alert("Todos los campos son obligatorios para generar el documento")
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
                                                text: "CERTIFICADO DE PRÁCTICAS",
                                                font: "Arial",
                                                bold: true,
                                                size: 22,
                                            })],
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
                                                text: "CÓDIGO: F-VS -39",
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
                                                children: ["FECHA:", new Date(Date.parse(documentState.fecha)).toLocaleDateString(undefined, { timeZone: "America/Los_Angeles" }).replaceAll("/", "-")],
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
                //Ciudad
                children: [documentState.ciudad,", ",
                    new Date(documentState.fecha).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })],
                font: "Century Gothic",
                break: 1,
                size: 18,
            }),
            ],
            spacing: {
                line: 360
            },
            alignment: AlignmentType.RIGHT
        }),
        //texto del documento
        new Paragraph({
            children: [new TextRun({
                children: ["La Jefatura de Vinculación con la Sociedad de la Universidad Católica de Cuenca, a través del Docente Responsable de ",
                    tipoDeDocumento,
                    " de la Carrera de ", documentState.carrera,
                    " de la Unidad Académica de ", estudiante_proyecto.estudiantes.unidad_academica,
                    " de la Universidad Católica de Cuenca – ",
                    documentState.matriz,";",//Matriz, sedes o extensiones
                    " a petición verbal de la parte interesada: "],
                font: "Century Gothic",
                break: 1,
                size: 18,
            }),
            
            ],
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
                line: 360
            }
        }),
            new Paragraph({
                children: [new TextRun({
                    text: "CERTIFICA",
                    font: "Century Gothic",
                    break: 1,
                    bold: true,
                    size: 22,
                }),],
                
            alignment: AlignmentType.CENTER,
                spacing: {
                    line: 360
                }
            }),
            new Paragraph({
                children: [new TextRun({
                    children: ["Que ",
                        //Pronombre
                        documentState.pronombreEstudiante,
                        " estudiante ", estudiante_proyecto.estudiantes.nombre_completo,
                        " portador/a del documento único de identidad número: ", estudiante_proyecto.cedula,
                        ", ha cumplido con sus horas de ", tipoDeDocumento, " de la siguiente manera:"],
                    font: "Century Gothic",
                    break: 1,
                    size: 18,
                }),],

                alignment: AlignmentType.JUSTIFIED,
                spacing: {
                    line: 360
                }
            }),
        new Table({
            alignment: AlignmentType.CENTER,


            rows: [
                new TableRow({
                    height: {
                        value: '1cm',
                        rule: HeightRule.EXACT
                    },

                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 4768,
                                type: WidthType.DXA
                            },

                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Proyecto/ Empresa",
                                        font: "Century Gothic",
                                        bold: true,
                                        size: 18,
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
                        }),
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 3010,
                                type: WidthType.DXA
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Período",
                                        font: "Century Gothic",
                                        bold: true,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.CENTER,
                            })],
                            alignment: AlignmentType.CENTER,
                        }),
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 779,
                                type: WidthType.DXA
                            },
                            children: [new Paragraph({

                                children: [
                                    new TextRun({
                                        text: "Horas",
                                        font: "Century Gothic",
                                        bold: true,
                                        size: 18,
                                    }),
                                ],

                                alignment: AlignmentType.CENTER,
                            })],

                        }),
                    ],
                }),
                new TableRow({
                    height: {
                        value: '3.28cm',
                        rule: HeightRule.EXACT
                    },
                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 55,
                                type: WidthType.PERCENTAGE
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: estudiante_proyecto.proyectos.instituciones_o_empresas,
                                        font: "Century Gothic",
                                        size: 18,
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
                        }),
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 35,
                                type: WidthType.PERCENTAGE
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        children: ["Fecha de inicio: ",new Date(Date.parse(documentState.fechaInicio)).toLocaleDateString(undefined, { timeZone: "America/Los_Angeles" }).replaceAll("/", "-")],/////
                                        font: "Century Gothic",
                                        size: 18,
                                    }),
                                    new TextRun({
                                        children: ["Fecha de fin: ", new Date(Date.parse(documentState.fechaFin)).toLocaleDateString(undefined, { timeZone: "America/Los_Angeles" }).replaceAll("/", "-")],/////
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    })],
                                alignment: AlignmentType.LEFT,
                            })],
                        }),
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 10,
                                type: WidthType.PERCENTAGE
                            },
                            children: [new Paragraph({

                                children: [
                                    new TextRun({
                                        text: estudiante_proyecto.proyectos.numero_de_horas_de_practicas.toString(),
                                        font: "Century Gothic",
                                        size: 18,
                                    }),
                                ],

                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                    ],
                }),
                new TableRow({
                    height: {
                        value: '1cm',
                        rule: HeightRule.EXACT
                    },
                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            columnSpan: 2,
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Total:  ",
                                        font: "Century Gothic",
                                        bold: true,
                                        size: 18,
                                    })
                                ],
                                alignment: AlignmentType.RIGHT,
                            }
                            )],
                        }),
                        new TableCell({
                            verticalAlign: "center",
                            children: [new Paragraph({

                                children: [
                                    new TextRun({
                                        text: estudiante_proyecto.proyectos.numero_de_horas_de_practicas.toString(),
                                        font: "Century Gothic",
                                        size: 18,
                                    }),
                                ],

                                alignment: AlignmentType.CENTER,
                            })],
                        }),
                    ],
                }),
            ],
        }),
        //Firmas
        new Paragraph({
            children: [new TextRun({
                text: "Atentamente",
                font: "Century Gothic",
                break: 4,
                size: 18,
            }),
            new TextRun({
                text: "DIOS, PATRIA, CULTURA Y DESARROLLO",
                font: "Century Gothic",
                break: 1,
                size: 18,
            }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: {
                line: 360
            }
        }),

        new Table({
            alignment: AlignmentType.CENTER,
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 50,
                                type: WidthType.PERCENTAGE
                            },
                            borders: {
                                top: {
                                    color: "FFFFFF",
                                },
                                bottom: {

                                    color: "FFFFFF",
                                },
                                left: {
                                    color: "FFFFFF",
                                },
                                right: {
                                    color: "FFFFFF",
                                }
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "_________________________________",
                                        font: "Century Gothic",
                                        break: 6,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        text: estudiante_proyecto.proyectos.docente_tutor,
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        children: ["Docente Responsable de ", tipoDeDocumento],
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        children: [documentState.carrera],
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
                        }), new TableCell({
                            verticalAlign: "center",
                            width: {
                                size: 50,
                                type: WidthType.PERCENTAGE
                            },
                            borders: {
                                top: {
                                    color: "FFFFFF",
                                },
                                bottom: {
                                    color: "FFFFFF",
                                },
                                left: {
                                    color: "FFFFFF",
                                },
                                right: {
                                    color: "FFFFFF",
                                }
                            },
                            children: [new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "_________________________________",
                                        font: "Century Gothic",
                                        break: 6,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        text: documentState.directorDeCarrera,
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        children: ["Director de Carrera"],
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                    new TextRun({
                                        children: [documentState.carrera],
                                        font: "Century Gothic",
                                        break: 1,
                                        size: 18,
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                            }
                            )],
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
            saveAs(blob, estudiante_proyecto.estudiantes.cedula + "-Documento39.docx");
        });
    }
    return (
        <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
            <h3>
                Generar Documento 39
            </h3>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Matriz, Sedes o Extensiones</ Form.Label >
                        < Form.Control name="matriz" type="text " placeholder="Matriz, Sedes o Extensiones" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Ciudad </ Form.Label >
                        < Form.Control name="ciudad" type="text " placeholder="Ciudad" onChange={handleChange} />
                    </ Form.Group >
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Pronombre del estudiante</ Form.Label >
                        < Form.Control name="pronombreEstudiante" type="text " placeholder="el/ella" onChange={handleChange} />
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
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Fecha de inicio de las prácticas </ Form.Label >
                        < Form.Control name="fechaInicio" type="date" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                        < Form.Label >Fecha de fin de las prácticas </ Form.Label >
                        < Form.Control name="fechaFin" type="date" onChange={handleChange} />
                    </ Form.Group >
                </Col>
                
            </Row>
            <Row style={{ marginTop: "10px" }}>
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


