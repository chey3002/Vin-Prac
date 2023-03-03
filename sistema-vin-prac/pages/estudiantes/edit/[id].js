import MenuWrapper from '@/components/sidebar'
import React from 'react'
import EstudianteForm from '@/components/estudiantesForm';
import axios from 'axios';
export default function EditEstudiante({ estudiante }) {
    return (
        <MenuWrapper >
            {estudiante ?
                (<EstudianteForm estudianteFetch={estudiante} />)
                :
                <h1>Estudiante no encontrado</h1>
            }
        </MenuWrapper>

    )
}
export const getServerSideProps = async (context) => {
    const res = await axios.get(process.env['HOST'] + 'api/estudiantes/' + context.query.id)
    if (res.data === null) {
        return {
            props: {
                estudiante: null
            }
        }
    }
    return {
        props: {
            estudiante: res.data[0]
        }
    }
}