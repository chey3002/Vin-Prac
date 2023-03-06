import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function ProyectoDetailPager({ proyecto }) {
    const router = useRouter();
    const handleDelete = async e => {
        const res = await axios.delete(`/api/proyectos/${proyecto.id}`)
        router.push("/proyectos")
    }
    return (
        <MenuWrapper>
            {proyecto ?
                (<Card style={{padding:"10px", display: "flex" , margin: "10px 0 10px 0" }} key={proyecto.cedula}>
                    <h1>
                        {proyecto.instituciones_o_empresas}
                    </h1>
                    <p>catedra_integradora:{proyecto.catedra_integradora}</p>
                    <p>proyecto_integrador:{proyecto.proyecto_integrador}</p>
                    <p>proyecto_servicio_comunitario:{proyecto.proyecto_servicio_comunitario}</p>
                    <p>numero_de_horas_de_practicas:{proyecto.numero_de_horas_de_practicas}</p>
                    <p>numero_de_estudiantes_que_deben_hacer_las_practicas:{proyecto.numero_de_estudiantes_que_deben_hacer_las_practicas}</p>
                    <p>actividades_a_realizar:{proyecto.actividades_a_realizar}</p>
                    <p>docente_tutor:{proyecto.docente_tutor}</p>
                    <p>propuesta_en_la_que_va_a_participar:{proyecto.propuesta_en_la_que_va_a_participar}</p>
                    <p>encargado_en_la_empresa:{proyecto.encargado_en_la_empresa}</p>
                    <p>tipo_de_proyecto:{proyecto.tipo_de_proyecto}</p>
                    <Button style={{
                        }} size="lg" variant="danger" onClick={handleDelete}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        Borrar</Button>
                    <Button size="lg" variant="info" onClick={() => router.push("/proyectos/edit/" + proyecto.id)}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                        Editar
                    </Button>
                </Card>) :
                <h1>Proyecto no encontrado</h1>}

        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/proyectos/' + context.query.id)
    if (res.data === null) {
        return {
            props: {
                proyecto: null
            }
        }
    }
    return {
        props: {
            proyecto: res.data[0]
        }
    }
}