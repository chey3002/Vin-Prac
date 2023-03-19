import { Semaforizacion } from '@/components/Semaforizacion';
import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import { Alert, Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap'
import fs from "fs/promises";
import path from "path"
import Link from 'next/link';
import Documento32 from '../../components/documentos/documento32';
import Documento39 from '@/components/documentos/documento39';
import CartaCompromiso from '@/components/documentos/cartaCompromiso';

export default function EstudianteDetailPager({ estudiante_proyecto, dirs }) {
    const [uploading, setUploading] = React.useState({
        "32": false,
        "33": false,
        "34": false,
        "35": false,
        "36": false,
        "37": false,
        "38": false,
        "39": false,
    });
    const [errorAlert, setError] = React.useState({
        code: "",
        message: "",
        show: false,
    })
    const [urlFile, setUrlFile] = React.useState("");
    const [selectedFile, setSelectedFile] = React.useState();
    const router = useRouter();
    const handleDelete = async e => {
        const res = await axios.delete(`/api/estudiantes_proyectos/${estudiante_proyecto.id_ep}`)
        router.push("/estudiantes_proyectos")
    }
    const handleUploading = async (tipoDoc) => {

        try {
            setUploading({ ...uploading, [tipoDoc]: true });
            if (!selectedFile) {
                setUploading({ ...uploading, [tipoDoc]: false });
                return
            }
            const formData = new FormData();
            formData.append('file', selectedFile);
            //console.log(uploading);
            const { data } = await axios.post("/api/files/" + estudiante_proyecto.id_ep + "_" + estudiante_proyecto.cedula + "_" + tipoDoc, formData).then(res => {
                //console.log(res.data);
                setUploading({ ...uploading, [tipoDoc]: false });
                setSelectedFile()
                router.replace(router.asPath);
                return res.data;
            })

        } catch (error) {
            if (Object.entries(error.response.data).length === 0) {
                //console.log(error);
                setError({
                    ...errorAlert,
                    code: error.code,
                    message: error.message,
                    show: true,
                })
            } else {
                setError({
                    ...errorAlert,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    show: true,
                })
            }

        }
    }
    function filtrarArchivosPorNumero(archivos, primerNumero, ultimoNumero) {
        const expresionRegular = new RegExp(`^${primerNumero}_\\d+_${ultimoNumero}\\.\\w+`);
        return archivos.filter((archivo) => expresionRegular.test(archivo));
    }


    const handleDeleteFile = async (item, tipoDoc) => {
        //console.log(item);
        try {
            const { data } = await axios.post("/api/files/delete/"
                + estudiante_proyecto.id_ep + "_"
                + estudiante_proyecto.cedula + "_"
                + tipoDoc, { item })
                .then(res => {
                    router.replace(router.asPath);
                    return res.data;
                })
            //console.log(data);

        } catch (error) {
            if (Object.entries(error.response.data).length === 0) {
                //console.log(error);
                setError({
                    ...errorAlert,
                    code: error.code,
                    message: error.message,
                    show: true,
                })
            } else {
                setError({
                    ...errorAlert,
                    code: error.response.data.code,
                    message: error.response.data.message,
                    show: true,
                })
            }

        }
    }
    return (
        <MenuWrapper>
            {errorAlert.show ?

                <Alert variant="danger" onClose={() => setError({ ...errorAlert, show: false })} dismissible>
                    <Alert.Heading>Error: {errorAlert.code}</Alert.Heading>
                    <p>
                        {errorAlert.message}
                    </p>
                </Alert> : ""
            }
            {estudiante_proyecto ?
                (<><Card style={{ padding: "10px", display: "flex", margin: "10px 0 10px 0", border: `3px solid ${Semaforizacion(estudiante_proyecto.fecha_limite).color}` }}>
                    <h2>
                        {estudiante_proyecto.estudiantes.nombre_completo}
                    </h2>
                    <h2>
                        {estudiante_proyecto.cedula}
                    </h2>
                    <p>Empresa:{estudiante_proyecto.proyectos.instituciones_o_empresas}</p>
                    <p>Propuesta:{estudiante_proyecto.proyectos.propuesta_en_la_que_va_a_participar}</p>
                    <p>Fecha de creación:{(new Date(Date.parse(estudiante_proyecto.fecha_de_creacion))).toLocaleString()}</p>
                    <p>Fecha limite:{(new Date(Date.parse(estudiante_proyecto.fecha_limite))).toLocaleString()}</p>
                    <p>Tipo de proyecto:{estudiante_proyecto.proyectos.tipo_de_proyecto}</p>
                    <div>
                        <Button style={{

                        }} size="lg" variant="danger" onClick={handleDelete}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                            Borrar</Button>
                        <Button size="lg" variant="info" onClick={() => router.push("/estudiantes_proyectos/edit/" + estudiante_proyecto.id_ep)}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                            Editar
                        </Button>
                    </div>

                </Card><Card>
                        <h2>
                            Archivos
                        </h2>
                        <Row>
                            <Col>
                                <CartaCompromiso estudiante_proyecto={estudiante_proyecto} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Documento32 estudiante_proyecto={estudiante_proyecto} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Documento39 estudiante_proyecto={estudiante_proyecto} />
                            </Col>
                        </Row>
                        {[32, 33, 34, 35, 36, 37, 38, 39].map((i) => (
                            <Row key={i} style={{ marginTop: "10px", marginBottom: "10px" }}>
                                <h3>Documento {i}</h3>
                                <Col lg={5}>
                                    <Form.Control name="file" type="file" onChange={
                                        ({ target }) => {
                                            if (target.files) {
                                                const file = target.files[0];
                                                setUrlFile(URL.createObjectURL(file))
                                                setSelectedFile(file)
                                            }
                                        }
                                    }
                                        accept=".xlsx, .doc, .pdf, .docx, .xls"
                                    />
                                </Col>
                                <Col lg={2}><Button
                                    onClick={() => handleUploading(i)}
                                    disabled={uploading[i]}
                                    style={{ opacity: uploading[i] ? ".5" : "1" }}

                                >
                                    {uploading[i] ? "Uploading.." : "Upload"}
                                </Button></Col>
                                <Col>
                                    <ListGroup>
                                        {filtrarArchivosPorNumero(dirs, estudiante_proyecto.id_ep, i)
                                            .map((item) => (
                                                <ListGroup.Item key={item}>
                                                    <Row>
                                                        <Col>
                                                            <Link key={item} href={"/files/" + estudiante_proyecto.cedula + "/" + item}>
                                                                {item}
                                                            </Link>
                                                        </Col>
                                                        <Col lg={4}>
                                                            <Button
                                                                onClick={() => handleDeleteFile(item, i)}
                                                                variant="danger"
                                                            >
                                                                Delete
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        ))}


                    </Card>

                </>) :
                <h1>Estudiante Proyectos no encontrado</h1>}

        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {

    const estudiantes_proyectos = await axios.get(process.env['HOST'] + 'api/estudiantes_proyectos/' + context.query.id)
    if (estudiantes_proyectos.data === null) {
        return {
            props: {
                estudiante_proyecto: null,
                dirs: null
            }
        }
    }

    try {
        const files = await fs.readdir(path.join(process.cwd(), "/public/files/" + estudiantes_proyectos.data[0].cedula));
        const estudiantes = await axios.get(process.env['HOST'] + 'api/estudiantes/' + estudiantes_proyectos.data[0].cedula)
        const proyectos = await axios.get(process.env['HOST'] + 'api/proyectos/' + estudiantes_proyectos.data[0].id_proyecto)

        return {
            props: {
                estudiante_proyecto: { ...estudiantes_proyectos.data[0], estudiantes: estudiantes.data[0], proyectos: proyectos.data[0] },
                dirs: files
            }
        }
    } catch (error) {
        await fs.mkdir(path.join(process.cwd(), "/public/files/" + estudiantes_proyectos.data[0].cedula));
        const estudiantes = await axios.get(process.env['HOST'] + 'api/estudiantes/' + estudiantes_proyectos.data[0].cedula)
        const proyectos = await axios.get(process.env['HOST'] + 'api/proyectos/' + estudiantes_proyectos.data[0].id_proyecto)

        return {
            props: {
                estudiante_proyecto: { ...estudiantes_proyectos.data[0], estudiantes: estudiantes.data[0], proyectos: proyectos.data[0] },
                dirs: []
            }
        }
    }

}