import MenuWrapper from '@/components/sidebar'
import React from 'react'
import axios from 'axios';
import ProyectoForm from '@/components/proyectoForm';
export default function EditProyectos({ proyecto }) {
    return (
        <MenuWrapper >
            {proyecto ?
                (<ProyectoForm proyectoFetch={proyecto} />)
                :
                <h1>Proyecto no encontrado</h1>
            }
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