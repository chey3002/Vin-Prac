import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
export default function EstudianteProyectoForm({ estudiantes, proyectos, estudiante_proyectoFetch, errorAlert, setError }) {

    const [estudiante_proyecto, setEstudianteProyecto] = useState({
        cedula: "",
        id_proyecto: "",
        fecha_limite: ""
    })
    const router = useRouter();

    const handleChange = (e) => {
        setEstudianteProyecto({ ...estudiante_proyecto, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (router.query.id) {
                const res = await axios.put('/api/estudiantes_proyectos/' + router.query.id, estudiante_proyecto);
            } else {
                const res = await axios.post('/api/estudiantes_proyectos', estudiante_proyecto)
            }
            router.push("/estudiantes_proyectos")
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

    const estudiantesSelect = estudiantes.map((estudiante) =>
    ({
        label: `${estudiante.cedula} | ${estudiante.nombre_completo}`,
        value: estudiante.cedula,
        target: {
            name: "cedula",
            value: estudiante.cedula
        }
    }))
    const proyectosSelect = proyectos.map((proyecto) =>
    ({
        label: `${proyecto.instituciones_o_empresas} | ${proyecto.tipo_de_proyecto} | ${proyecto.propuesta_en_la_que_va_a_participar} | ${proyecto.docente_tutor}`,
        value: proyecto.id,
        target: {
            name: "id_proyecto",
            value: proyecto.id
        }
    }))
    useEffect(() => {
        if (router.query.id) {
            setEstudianteProyecto({ ...estudiante_proyectoFetch })
        }
    }, [])

    //console.log(proyectosSelect.find((opcion) => opcion.value === estudiante_proyectoFetch?.id_proyecto));
    return (
        <Card style={{ padding: "10px" }}>
            <h2>Ingresar nuevo estudiante_proyecto</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCedula">
                    <Form.Label>Nro de cedula</Form.Label>
                    <Select defaultValue={
                        {
                            label: (estudiantesSelect.find((opcion) => opcion.value === estudiante_proyectoFetch?.cedula))?.label,
                            value: (estudiantesSelect.find((opcion) => opcion.value === estudiante_proyectoFetch?.cedula))?.value

                        }
                    } onChange={handleChange} name="tipo_de_proyecto"
                        options={estudiantesSelect} />
                    <Form.Text className="text-muted">
                        Cedula | Nombre Completo
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formProyecto">
                    <Form.Label>Id del proyecto</Form.Label>
                    <Select defaultValue={
                        {
                            label: (proyectosSelect.find((opcion) => opcion.value === estudiante_proyectoFetch?.id_proyecto))?.label,
                            value: (proyectosSelect.find((opcion) => opcion.value === estudiante_proyectoFetch?.id_proyecto))?.value

                        }
                    } onChange={handleChange} name="tipo_de_proyecto"
                        options={proyectosSelect} />
                    <Form.Text className="text-muted">
                        Instituciones o empresas | Tipo de proyecto | Propuesta en la que va a participar | Docente tutor
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFechaLimite">
                    <Form.Label>Fecha límite</Form.Label>
                    <Form.Control defaultValue={estudiante_proyectoFetch?.fecha_limite.slice(0, 10)} name="fecha_limite" type="date" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {router.query.id ? "Editar" : "Registrar"}

                </Button>
            </Form>
        </Card>
    )
}

