import { bordeSemaforizado } from '@/components/BordeSemaforizado';
import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function EstudianteDetailPager({ estudiante_proyecto }) {
    const router = useRouter();
    const handleDelete = async e => {
        const res = await axios.delete(`/api/estudiantes_proyectos/${estudiante_proyecto.id_ep}`)
        router.push("/estudiantes_proyectos")
    }
    
    return (
        <MenuWrapper>
            {estudiante_proyecto ?
                (<Card style={{ padding: "10px", display: "flex", width: "450px", margin: "10px 0 10px 0", border: bordeSemaforizado(estudiante_proyecto.fecha_limite) }}>
                    <h1>
                        {estudiante_proyecto.estudiantes.nombre_completo}
                    </h1>
                    <h1>
                        {estudiante_proyecto.cedula}
                    </h1>
                    <p>Empresa:{estudiante_proyecto.proyectos.instituciones_o_empresas}</p>
                    <p>Propuesta:{estudiante_proyecto.proyectos.propuesta_en_la_que_va_a_participar}</p>
                    <p>Fecha de creación:{(new Date(Date.parse(estudiante_proyecto.fecha_de_creacion))).toLocaleString()}</p>
                    <p>Fecha limite:{(new Date(Date.parse(estudiante_proyecto.fecha_limite))).toLocaleString()}</p>
                    <p>Tipo de proyecto:{estudiante_proyecto.proyectos.tipo_de_proyecto}</p>
                    <Button style={{

                    }} size="lg" variant="danger" onClick={handleDelete}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                        </svg>
                        Borrar</Button>
                    <Button size="lg" variant="info" onClick={() => router.push("/estudiantes_proyectos/edit/" + estudiante_proyecto.id_ep)}>

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                        </svg>
                        Editar
                    </Button>

                </Card>) :
                <h1>Estudiante Proyectos no encontrado</h1>}

        </MenuWrapper>
    )
}
export const getServerSideProps = async (context) => {
    const estudiantes_proyectos = await axios.get(process.env['HOST'] + 'api/estudiantes_proyectos/' + context.query.id)
    if (estudiantes_proyectos.data === null) {
        return {
            props: {
                estudiante_proyecto: null
            }
        }
    }
    const estudiantes = await axios.get(process.env['HOST'] + 'api/estudiantes/' + estudiantes_proyectos.data[0].cedula)
    const proyectos = await axios.get(process.env['HOST'] + 'api/proyectos/' + estudiantes_proyectos.data[0].id_proyecto)

    return {
        props: {
            estudiante_proyecto: { ...estudiantes_proyectos.data[0], estudiantes: estudiantes.data[0], proyectos: proyectos.data[0] }
        }
    }
}