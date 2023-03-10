import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
export default function EstudianteForm({ estudianteFetch,errorAlert,setError }) {
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
        try {
            if (router.query.id) {
                const res = await axios.put('/api/estudiantes/' + router.query.id, estudiante)
                console.log(res);
                router.push("/estudiantes")
            }
            else {
                const res = await axios.post('/api/estudiantes', estudiante)
                router.push("/estudiantes")
            }
        } catch (error) {
            if (Object.entries(error.response.data).length === 0) {
                console.log(error);
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
                    <Form.Label>Nro de c??dula</Form.Label>
                    {router.query.id ?
                        <Form.Control disabled readOnly defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el n??mero de c??dula del estudiante" />
                        :
                        <Form.Control defaultValue={estudiante.cedula} name="cedula" type="text" placeholder="Ingrese el n??mero de cedula del estudiante" onChange={handleChange} />
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
                    <Form.Label>Unidad Acad??mica</Form.Label>
                    <Form.Control defaultValue={estudiante.unidad_academica} name="unidad_academica" type="text" placeholder="Ingrese el la unidad acad??mica a la cual pertenece el estudiante" onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    {router.query.id ? "Editar" : "Registrar"}
                </Button>
            </Form>
        </Card>
    )
}
