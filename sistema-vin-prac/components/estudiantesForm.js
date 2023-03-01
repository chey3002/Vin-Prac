import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function EstudianteForm() {
    const [estudiante, setEstudiante] = useState({
        nroCedula: "",
        ciclo: "",
        nombreCompleto: ""
    })
    const router = useRouter();

    const handleChange = (e) => {
        setEstudiante({...estudiante, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/estudiantes', estudiante)
        router.push("/estudiantes")

    }
    
    return (
            <Card style={{ padding: "10px" }}>
                <h2>Ingresar nuevo estudiante</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formCedula">
                        <Form.Label>Nro de cedula</Form.Label>
                    <Form.Control name="nroCedula" type="text" placeholder="Ingrese el número de cedula del estudiante" onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCiclo">
                        <Form.Label>Ciclo</Form.Label>
                    <Form.Control name="ciclo" type="number" placeholder="Ingrese el ciclo del estudiante" onChange={handleChange} />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre completo</Form.Label>
                    <Form.Control name="nombreCompleto" type="text" placeholder="Ingrese el nombre completo del estudiante" onChange={handleChange} />
                        <Form.Text className="text-muted">
                            Dos nombres, y dos apellidos.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Crear
                    </Button>
                </Form>
            </Card>
    )
}
