import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { saveAs } from "file-saver";
import { Document, Footer, Header, Packer, Paragraph, Table, TableCell, TableRow, ImageRun, WidthType, TextRun, AlignmentType, PageNumber, HeightRule } from "docx";

export default function CartaCompromiso({ estudiante_proyecto }) {
    const [documentState, setDocumentState] = React.useState({
        nombre_empresa_institucion: "",
        actividad_empresa_institucion: "",
        representante_legal_empresa_institucion: "",
        direccion_empresa_institucion: "",
        telefono_empresa_institucion: "",
        email_empresa_institucion: "",
        nombre_estudiante: "",
        cedula_estudiante: "",
        ciclo_estudiante: "",
        horas_estudiante: "",
        celular_estudiante: "",
        email_estudiante: "",
        fecha_inicio: "",
        fecha_fin: "",
        fecha_documento: "",
        docente_tutor: "",
        actividad: "",
        nombre_director_de_carrera: "",
        paralelo_estudiante: ""
    });

    const handleChange = (e) => {
        if (e.target.name === "fecha_documento" || e.target.name === "fecha_inicio" || e.target.name === "fecha_fin") {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value + "T12:00:00.000Z" })
        } else {
            setDocumentState({ ...documentState, [e.target.name]: e.target.value })
        }
    }

    const handleGenerateDoc = async () => {
        if (
            documentState.nombre_empresa_institucion === "" ||
            documentState.actividad_empresa_institucion === "" ||
            documentState.representante_legal_empresa_institucion === "" ||
            documentState.direccion_empresa_institucion === "" ||
            documentState.telefono_empresa_institucion === "" ||
            documentState.email_empresa_institucion === "" ||
            documentState.nombre_estudiante === "" ||
            documentState.cedula_estudiante === "" ||
            documentState.ciclo_estudiante === "" ||
            documentState.horas_estudiante === "" ||
            documentState.celular_estudiante === "" ||
            documentState.email_estudiante === "" ||
            documentState.fecha_inicio === "" ||
            documentState.fecha_fin === "" ||
            documentState.fecha_documento === "" ||
            documentState.docente_tutor === "" ||
            documentState.actividad === "" ||
            documentState.nombre_director_de_carrera === "" ||
            documentState.paralelo_estudiante === ""
        ) {
            alert(
                "Todos los campos son obligatorios para generar el documento"
            );
            return;
        }

        //llamo a las imágenes del documento
        const headerImage = await fetch(
            "/Recursos/header_CartaCompromiso.png"
        ).then(r => r.blob());
        const footerImage = await fetch(
            "/Recursos/footer_CartaCompromiso.png"
        ).then(r => r.blob());
        //Creo el header
        const header = new Header({
            children: [
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: headerImage,
                            transformation: {
                                width: 592,
                                height: 85
                            }
                        })
                    ],
                    alignment: AlignmentType.CENTER,
                })],
        })
        //creo el footer del documento
        const footer = new Footer({
            children: [new Paragraph({
                children: [
                    new ImageRun({
                        data: footerImage,
                        transformation: {
                            width: 596,
                            height: 40
                        }
                    })
                ],
                alignment: AlignmentType.CENTER,
            })],
        })
        //creo el cuerpo del documento
        const bodyDocument = [
            new Paragraph({
                //Encabezado del documento
                children: [
                    new TextRun({
                        children: [
                            "PROPUESTA PARA LA FIRMA DE LA CARTA COMPROMISO PARA LA REALIZACIÓN DE LA PRÁCTICA PRE PROFESIONAL",
                        ],
                        font: "Arial",
                        bold: true,
                        size: 24,
                    }),
                ],
                spacing: {
                    line: 360,
                },
                alignment: AlignmentType.CENTER,
            }),
            //texto del documento
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["DATOS DE LA EMPRESA O INSTITUCIÓN"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Table({
                alignment: AlignmentType.CENTER,
                rows: [
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                columnSpan: 2,
                                width: {
                                    size: 12000,
                                    type: WidthType.DXA, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Nombre: ",
                                                    documentState.nombre_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                columnSpan: 2,
                                width: {
                                    size: 9626.456692913385,
                                    type: WidthType.DXA, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Actividad de la Empresa/Institución: ",
                                                    documentState.actividad_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                columnSpan: 2,
                                width: {
                                    size: 9626.456692913385,
                                    type: WidthType.DXA, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Representante Legal: ",
                                                    documentState.representante_legal_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                columnSpan: 2,
                                width: {
                                    size: 9626.456692913385,
                                    type: WidthType.DXA, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Dirección: ",
                                                    documentState.direccion_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 50,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Teléfono: ",
                                                    documentState.telefono_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 50,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "E-mail: ",
                                                    documentState.email_empresa_institucion,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["DATOS DE EL O LA ESTUDIANTE "],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Table({
                alignment: AlignmentType.CENTER,
                rows: [
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                columnSpan: 4,
                                width: {
                                    size: 9626.456692913385,
                                    type: WidthType.DXA, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Nombre: ",
                                                    documentState.nombre_estudiante,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.6cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Nº de cédula: ",
                                                    documentState.cedula_estudiante,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 21.6666666667,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Ciclo: ",
                                                    documentState.ciclo_estudiante,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 21.6666666667,
                                    type: WidthType.PERCENTAGE, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Paralelo: ",
                                                    documentState.paralelo_estudiante,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 21.6666666667,
                                    type: WidthType.PERCENTAGE, //https://unit-converter-bcmmybn3dq-ez.a.run.app/
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Nº de horas: ",
                                                    documentState.horas_estudiante,
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.LEFT,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["OBJETIVO"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        text: "Promover la formación académica integral de los estudiantes en los aspectos cognitivos, procedimentales y actitudinales en la intervención pre profesional. Promover la aplicación de los conocimientos teóricos y metodológicos en los diferentes campos de intervención",
                        font: "Arial",
                        size: 22,
                        break: 1,
                    }),
                ],
                alignment: AlignmentType.JUSTIFIED,
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["COMPROMISOS DE LAS PARTES"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["DE LA INSTITUCIÓN O EMPRESA"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 1,
                },
            }),

            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "Brindar al estudiante las facilidades necesarias para realizar las prácticas pre-profesionales, además de un proceso de inducción sobre las condiciones y deberes que debe cumplir el estudiante para el inicio de las tareas administrativas como operativas.",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "Designar el área específica de realización de las prácticas acorde a la carrera de Software.",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "Designar un tutor encargado de calificar e informar el desempeño del estudiante durante su período de prácticas pre-profesionales. ",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "Controlar las horas prácticas del estudiante.",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "Extender oportunamente el certificado de cumplimiento de las prácticas del estudiante cuando este haya cumplido con todos los requerimientos, en el cual indique el tiempo de duración, los datos generales de la actividad y desempeño de la misma.",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["DE LA UNIVERSIDAD CATÓLICA DE CUENCA "],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 1,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "La Universidad Católica de Cuenca, a través de la Unidad Académica de Informática, Ciencias de la Computación, e Innovación Tecnológica, se compromete a:",
                        ],
                        font: "Arial",
                        size: 20,
                        break: 1,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "El estudiante deberá acoplarse a los horarios establecidos por parte de Centro de Salud C Materno Infantil y Emergencias Cuenca. La Carrera de Software se compromete a través de un Docente-Supervisor a realizar el control y seguimiento del estudiante practicante.",
                        ],
                        font: "Arial",
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 2,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["PLAZO"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: [
                            "El plazo para la realización de las ",
                            documentState.actividad,
                            " del ",
                            documentState.nombre_empresa_institucion,
                            ", será desde el ",
                            new Date(
                                documentState.fecha_inicio
                            ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                            " AL ",
                            new Date(
                                documentState.fecha_fin
                            ).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }),
                            ,
                            ", pudiendo las partes ampliar el plazo de vigencia mediante la suscripción de una carta aclaratoria que indique las fechas o periodo de vencimiento.",
                        ],
                        font: "Arial",
                        size: 20,
                        break: 1,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
                children: [
                    new TextRun({
                        children: ["APROBACIONES"],
                        font: "Arial",
                        bold: true,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
                numbering: {
                    reference: "my-crazy-numbering",
                    level: 0,
                },
            }),
            new Paragraph({
                children: [
                    new TextRun({

                        children: [""],
                        font: "Arial",
                        bold: true,
                        break: 1,
                        size: 20,
                    }),
                ],
                alignment: AlignmentType.LEFT,
            }),
            new Table({
                alignment: AlignmentType.CENTER,
                rows: [
                    new TableRow({
                        height: {
                            value: "0.7cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 33.333333,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Elaborado por:",
                                                font: "Arial",
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 33.333333,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Revisado por:",
                                                font: "Arial",
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",
                                width: {
                                    size: 33.333333,
                                    type: WidthType.PERCENTAGE,
                                },
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: "Autorizado por:",
                                                font: "Arial",
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "3cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "bottom",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: documentState.docente_tutor,
                                                font: "Arial",
                                                size: 20,
                                            }),
                                            new TextRun({
                                                children: [
                                                    "Docente Responsable de ",
                                                    documentState.actividad,
                                                ],
                                                font: "Arial",
                                                break: 1,
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "bottom",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: documentState.representante_legal_empresa_institucion,
                                                font: "Arial",
                                                size: 20,
                                            }),
                                            new TextRun({
                                                children: [
                                                    "Representante Legal de la Empresa",
                                                ],
                                                font: "Arial",
                                                break: 1,
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "bottom",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: documentState.nombre_director_de_carrera,
                                                font: "Arial",
                                                size: 20,
                                            }),
                                            new TextRun({
                                                children: [
                                                    "Director(a) de Carrera",
                                                ],
                                                font: "Arial",
                                                break: 1,
                                                bold: true,
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                        ],
                    }),
                    new TableRow({
                        height: {
                            value: "0.7cm",
                            rule: HeightRule.EXACT,
                        },
                        children: [
                            new TableCell({
                                verticalAlign: "center",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Fecha: ",
                                                    new Date(
                                                        documentState.fecha_documento
                                                    ).toLocaleDateString(
                                                        "es-ES",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    ),
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Fecha: ",
                                                    new Date(
                                                        documentState.fecha_documento
                                                    ).toLocaleDateString(
                                                        "es-ES",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    ),
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                            new TableCell({
                                verticalAlign: "center",

                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                children: [
                                                    "Fecha: ",
                                                    new Date(
                                                        documentState.fecha_documento
                                                    ).toLocaleDateString(
                                                        "es-ES",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    ),
                                                ],
                                                font: "Arial",
                                                size: 20,
                                            }),
                                        ],
                                        alignment: AlignmentType.CENTER,
                                    }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
        ];
        //armo el documento
        let doc = new Document({
            //descripción de la numeración que se va a utilizar
            numbering: {
                config: [
                    {
                        reference: "my-crazy-numbering",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: 700, hanging: 260 },
                                    },
                                },
                            },
                            {
                                level: 1,
                                format: "decimal",
                                text: "%1.%2.",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: 1000, hanging: 260 },
                                    },
                                },
                            },
                            {
                                level: 2,
                                format: "lowerLetter",
                                text: "%3)",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: 1300, hanging: 260 },
                                    },
                                },
                            },
                            {
                                level: 3,
                                format: "upperLetter",
                                text: "%4)",
                                alignment: AlignmentType.START,
                                style: {
                                    paragraph: {
                                        indent: { left: 1600, hanging: 260 },
                                    },
                                },
                            },
                        ],
                    },
                ],
            },
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
            saveAs(blob, estudiante_proyecto.estudiantes.cedula + "-CartaCompromiso.docx");
        });
        //console.log(documentState);
    }

    return (
        <Container style={{ marginTop: "10px", marginBottom: "10px" }}>
            <h3>Generar carta compromiso</h3>
            <b>Datos de la empresa o institución</b>

            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formNombreEmpresaInstitucion">
                        <Form.Label>Nombre de la empresa o institución</Form.Label>
                        <Form.Control name="nombre_empresa_institucion" type="text" placeholder="Nombre de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formActividadEmpresaInstitución">
                        <Form.Label>Actividad de la empresa o institución</Form.Label>
                        <Form.Control name="actividad_empresa_institucion" type="text" placeholder="Actividad de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formRepresentanteLegalEmpresaInstitución">
                        <Form.Label>Representante legal de la empresa o institución</Form.Label>
                        <Form.Control name="representante_legal_empresa_institucion" type="text" placeholder="Representante legal de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formDireccionEmpresaInstitución">
                        <Form.Label>Dirección de la empresa o institución</Form.Label>
                        <Form.Control name="direccion_empresa_institucion" type="text" placeholder="Dirección de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formTelefonoEmpresaInstitución">
                        <Form.Label>Teléfono de la empresa o institución</Form.Label>
                        <Form.Control name="telefono_empresa_institucion" type="text" placeholder="Teléfono de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formEmailEmpresaInstitución">
                        <Form.Label>Email de la empresa o institución</Form.Label>
                        <Form.Control name="email_empresa_institucion" type="email" placeholder="Email de la empresa o institución" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <b>Datos del estudiante</b>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formNombreEstudiante">
                        <Form.Label>Nombre completo del estudiante</Form.Label>
                        <Form.Control name="nombre_estudiante" type="text" placeholder="Nombre completo del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formCedulaEstudiante">
                        <Form.Label>Cédula del estudiante</Form.Label>
                        <Form.Control name="cedula_estudiante" type="text" placeholder="Cédula del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formCicloEstudiante">
                        <Form.Label>Ciclo académico del estudiante</Form.Label>
                        <Form.Control name="ciclo_estudiante" type="text" placeholder="Ciclo académico del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formCicloEstudiante">
                        <Form.Label>Paralelo del estudiante</Form.Label>
                        <Form.Control name="paralelo_estudiante" type="text" placeholder="Paralelo del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formHorasEstudiante">
                        <Form.Label>Horas de dedicación del estudiante</Form.Label>
                        <Form.Control name="horas_estudiante" type="text" placeholder="Horas de dedicación del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formCelularEstudiante">
                        <Form.Label>Celular del estudiante</Form.Label>
                        <Form.Control name="celular_estudiante" type="tel" placeholder="Celular del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formEmailEstudiante">
                        <Form.Label>Email del estudiante</Form.Label>
                        <Form.Control name="email_estudiante" type="email" placeholder="Email del estudiante" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formFechaInicio">
                        <Form.Label>Fecha de inicio de la actividad</Form.Label>
                        <Form.Control name="fecha_inicio" type="date" placeholder="Fecha de inicio de la actividad" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formFechaFin">
                        <Form.Label>Fecha de fin de la actividad</Form.Label>
                        <Form.Control name="fecha_fin" type="date" placeholder="Fecha de fin de la actividad" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <b>Datos del documento</b>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formFechaDocumento">
                        <Form.Label>Fecha del documento</Form.Label>
                        <Form.Control name="fecha_documento" type="date" placeholder="Fecha del documento" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formNombreDirectorCarrera">
                        <Form.Label>Nombre del director de carrera</Form.Label>
                        <Form.Control name="nombre_director_de_carrera" type="text" placeholder="Nombre del director de carrera" onChange={handleChange} />
                    </Form.Group>
                </Col>

            </Row>
            <Row>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formDocenteTutor">
                        <Form.Label>Docente tutor</Form.Label>
                        <Form.Control name="docente_tutor" type="text" placeholder="Docente tutor" onChange={handleChange} />
                    </Form.Group>
                </Col>
                <Col lg={true}>
                    <Form.Group className="mb-3" controlId="formActividad">
                        <Form.Label>Actividad</Form.Label>
                        <Form.Control name="actividad" type="text" placeholder="Prácticas Pre Profesionales" onChange={handleChange} />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="primary" onClick={handleGenerateDoc}>Generar documento</Button>
        </Container>
    )
}