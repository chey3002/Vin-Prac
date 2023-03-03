import MenuWrapper from '@/components/sidebar'
import React from 'react'
import axios from 'axios';
import EstudianteProyectoForm from '@/components/estudiantes_proyectosForm';
export default function EditEstudiantesProyectos({ estudiantes, proyectos, estudiantes_proyectos }) {
    return (
        <MenuWrapper >
            {estudiantes_proyectos ?
                <EstudianteProyectoForm estudiantes={estudiantes} proyectos={proyectos} estudiante_proyectoFetch={estudiantes_proyectos} />
                :
                <h1>Proyecto no encontrado</h1>
            }
        </MenuWrapper>

    )
}
export const getServerSideProps = async (context) => {
    const estudiantes = await axios.get(process.env['HOST'] + 'api/estudiantes')
    const proyectos = await axios.get(process.env['HOST'] + 'api/proyectos')
    const estudiantes_proyectos = await axios.get(process.env['HOST'] + 'api/estudiantes_proyectos/' + context.query.id)

    return {
        props: {
            estudiantes: estudiantes.data,
            proyectos: proyectos.data,
            estudiantes_proyectos: estudiantes_proyectos.data[0]

        }
    }
}