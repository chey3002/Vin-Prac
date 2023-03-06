import React, { useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
export default function ProyectoForm({ proyectoFetch }) {
    const [proyecto, setProyecto] = useState({
        catedra_integradora:"",
        proyecto_integrador: "",
        proyecto_servicio_comunitario: "",
        numero_de_horas_de_practicas: "",
        numero_de_estudiantes_que_deben_hacer_las_practicas: "",
        actividades_a_realizar: "",
        docente_tutor: "",
        instituciones_o_empresas: "",
        propuesta_en_la_que_va_a_participar: "",
        encargado_en_la_empresa: "",
        tipo_de_proyecto: "",
    })
    const router = useRouter();

    const handleChange = (e) => {
        
        setProyecto({ ...proyecto, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (router.query.id) { 
            const res = await axios.put('/api/proyectos/' + router.query.id, proyecto);
        } else {
            const res = await axios.post('/api/proyectos', proyecto)
        }
        router.push("/proyectos")


    }
    const opciones = [{ label: "Practicas", value: "Practicas" },
        { label: "Vinculación", value:"Vinculación"}
    ]
    const opcionesSelect = opciones.map((option) =>
    ({
        label: option.label,
        value: option.value,
        target: {
            name: "tipo_de_proyecto",
            value: option.value
        }
    }))
    useEffect(() => {
        if (router.query.id) {
            setProyecto({ ...proyectoFetch })
        }

    }, [])
    return (
        <Card style={{ padding: "10px" }}>
            <h2>Ingresar nuevo proyecto</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb -3 " controlId="formInstitucionesOEmpresas ">
                    < Form.Label >Instituciones o Empresas </ Form.Label >
                    < Form.Control defaultValue={proyecto.instituciones_o_empresas} name="instituciones_o_empresas" type="text " placeholder="Instituciones o Empresas " onChange={handleChange} /> </ Form.Group >
                <Form.Group className="mb-3" controlId="formCedula">
                    <Form.Label>catedra_integradora</Form.Label>
                    <Form.Control defaultValue={proyecto.catedra_integradora} name="catedra_integradora" type="text" placeholder="catedra_integradora" onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProyectoIntegrador">
                    <Form.Label>Proyecto Integrador</Form.Label>
                    <Form.Control defaultValue={proyecto.proyecto_integrador} name="proyecto_integrador" type="text" placeholder="Proyecto Integrador" onChange={handleChange} /> </Form.Group>

                <Form.Group className="mb-3" controlId="formProyectoServicioComunitario">
                    <Form.Label>Proyecto Servicio Comunitario</Form.Label>
                    <Form.Control defaultValue={proyecto.proyecto_servicio_comunitario} name="proyecto_servicio_comunitario" type="text" placeholder="Proyecto Servicio Comunitario" onChange={handleChange} /> </Form.Group>

                <Form.Group className="mb-3" controlId="formNumeroDeHorasDePracticas">
                    <Form.Label>Número de Horas de Prácticas</Form.Label>
                    <Form.Control defaultValue={proyecto.numero_de_horas_de_practicas} name="numero_de_horas_de_practicas" type="number" placeholder="Número de Horas de Prácticas" onChange={handleChange} /> </Form.Group>

                <Form.Group className="mb-3" controlId="formNumeroDeEstudiantesQueDebenHacerLasPracticas">
                    <Form.Label>Número de Estudiantes que Deben Hacer las Prácticas</Form.Label>
                    <Form.Control defaultValue={proyecto.numero_de_estudiantes_que_deben_hacer_las_practicas} name="numero_de_estudiantes_que_deben_hacer_las_practicas" type="number" placeholder="Número de Estudiantes que Deben Hacer las Prácticas" onChange={handleChange} /> </Form.Group>

                <Form.Group className="mb-3" controlId="formActividadesARealizar">
                    <Form.Label>Actividades a Realizar</Form.Label>
                    <Form.Control defaultValue={proyecto.actividades_a_realizar} name="actividades_a_realizar" as="textarea" rows={3} placeholder="Actividades a Realizar " onChange={handleChange} /> </ Form.Group >

                <Form.Group className="mb -3 " controlId="formDocenteTutor ">
                    < Form.Label >Docente Tutor </ Form.Label >
                    < Form.Control defaultValue={proyecto.docente_tutor} name="docente_tutor" type="text " placeholder="Docente Tutor " onChange={handleChange} />
                </ Form.Group >
                <Form.Group className="mb -3 " controlId="formPropuestaEnLaQueVaAParticipar ">
                    < Form.Label >Propuesta en la que va a Participar </ Form.Label >
                    < Form.Control defaultValue={proyecto.propuesta_en_la_que_va_a_participar} name="propuesta_en_la_que_va_a_participar" as="textarea" rows={3} placeholder="Propuesta en la que va a Participar" onChange={handleChange} /> </ Form.Group >

                <Form.Group className="mb -3 " controlId="formEncargadoEnLaEmpresa ">
                    < Form.Label >Encargado en la Empresa </ Form.Label >
                    < Form.Control defaultValue={proyecto.encargado_en_la_empresa} name="encargado_en_la_empresa" type="text" placeholder="Encargado en la Empresa" onChange={handleChange} /> </ Form.Group >

                <Form.Group className="mb-3" controlId="formTipoDeProyecto">
                    <Form.Label>Tipo de Proyecto</Form.Label>
                    <Select defaultValue={
                        { 
                            label: (opcionesSelect.find((opcion) => opcion.value === proyecto.proyectoFetch))?.label,
                            value: (opcionesSelect.find((opcion) => opcion.value === proyecto.proyectoFetch))?.value

                        }
                    }  onChange={handleChange} name="tipo_de_proyecto"
                        options={opcionesSelect} />
                    </ Form.Group >

                <Button variant="primary" type="submit">
                    {router.query.id ? "Editar" : "Crear"}
                </Button>
            </Form>
        </Card>
    )
}
