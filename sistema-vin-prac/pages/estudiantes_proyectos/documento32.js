import React from 'react'
import { Document, Footer, Header, Packer, Paragraph, Table, TableCell, TableRow, ImageRun, WidthType, TextRun, AlignmentType } from "docx";
import { Button } from 'react-bootstrap';
import { saveAs } from "file-saver";

export default function Documento32({asignacion}) {

    const handleGenerateDoc =async () => {
        const logo = await fetch(
            "/Recursos/ucacueLogo.jpg"
        ).then(r => r.blob());
        let doc = new Document({
            sections: [
                {
                    headers: {
                        default: new Header({
                            children: [
                                new Table({
                                    rows: [
                                        new TableRow({
                                            children: [
                                                new TableCell({
                                                    children: [new Paragraph({
                                                        children: [
                                                            new ImageRun({
                                                                data: logo,
                                                                transformation: {
                                                                    width: 169,
                                                                    height: 50
                                                                }
                                                            })
                                                        ]
                                                    })],
                                                }),
                                                new TableCell({
                                                    children: [new Paragraph({
                                                        text: "OFICIO DIRECCIÓN DE CARRERA",
                                                        alignment: AlignmentType.CENTER,
                                                    })],
                                                }),
                                                new TableCell({
                                                    children: [new Paragraph({
                                                        children: [
                                                            new TextRun({
                                                                text: "CÓDIGO: F- VS - 32",
                                                            }),
                                                            new TextRun({
                                                                text: "VERSION: 01",
                                                                break: 1,
                                                            }),
                                                            new TextRun({
                                                                text: "FECHA: 06 - 05 - 2020",
                                                                break: 1,
                                                            }),
                                                            new TextRun({
                                                                text: "Página 1 de 1",
                                                                break: 1,
                                                            }),
                                                        ],
                                                        alignment: AlignmentType.CENTER,
                                                    })],
                                                }),
                                            ],
                                        }),
                                        // Agregar más filas según sea necesario
                                    ],
                                }),
                            ],
                        }),
                    },
                    footers: {
                        default: new Footer({
                            children: [new Paragraph("Footer text")],
                        }),
                    },
                    children: [new Paragraph("Hello World")],
                },
            ],
        });
        Packer.toBlob(doc).then(blob => {
            console.log(blob);
            saveAs(blob, "example.docx");
            console.log("Document created successfully");
        });
    }
    return (
        <Button onClick={handleGenerateDoc}>
            Generar Documento 32
    </Button>);

}


