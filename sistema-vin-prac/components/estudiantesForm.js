import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function EstudianteForm({ estudianteFetch }) {
    const [estudiante, setEstudiante] = useState({
        cedula: "",
        ciclo: "",
        nombre_completo: "",
        unidad_academica: ""
    })
    const router = useRouter();

    const handleChange = (e) => {
        setEstudiante({ ...estudiante, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (router.query.id) {
            const res = await axios.put('/api/estudiantes/' + router.query.id, estudiante)

        }
        else {
            const res = await axios.post('/api/estudiantes', estudiante)

        }
        router.push("/estudiantes")

    }
    useEffect(() => {
        if (router.query.id) {
            setEstudiante({ ...estudianteFetch })
        }
    }, [])

    return (
        <Card style={{ padding: "10px" }}>
            <h2>Ingresar nuevo estudiante</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formCedula">
                    <Form.Label>Nro de cedula</Form.Label>
                    {router.query.id ?
                        <Form.Control disabled readOnly defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el número de cedula del estudiante" />
                        :
                        <Form.Control defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el número de cedula del estudiante" onChange={handleChange} />
                    }

                </Form.Group>
                <Form.Group className="mb-3" controlId="formCiclo">
                    <Form.Label>Ciclo</Form.Label>
                    <Form.Control defaultValue={estudiante.ciclo} name="ciclo" type="number" placeholder="Ingrese el ciclo del estudiante" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Label>Nombre completo</Form.Label>
                    <Form.Control defaultValue={estudiante.nombre_completo} name="nombre_completo" type="text" placeholder="Ingrese el nombre completo del estudiante" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        Dos nombres, y dos apellidos.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUnidadAcademica">
                    <Form.Label>Unidad Académica</Form.Label>
                    <Form.Control defaultValue={estudiante.unidad_academica} name="unidad_academica" type="text" placeholder="Ingrese el la unidad académica a la cual pertenece el estudiante" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {router.query.id ? "Editar" : "Crear"}
                </Button>
            </Form>
        </Card>
    )
}
