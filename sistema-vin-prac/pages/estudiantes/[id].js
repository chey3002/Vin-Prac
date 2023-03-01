import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import { useRouter } from 'next/router';
import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function EstudianteDetailPager({ estudiante }) {
    const router = useRouter();
    const handleDelete = async e => {
        const res = await axios.delete(`/api/estudiantes/${estudiante.cedula}`)
        router.push("/estudiantes")
    }
    
    return (
        <MenuWrapper>
            {estudiante ?
                (<Card style={{padding:"10px", display: "flex",width:"450px" , margin: "10px 0 10px 0" }} key={estudiante.cedula}>
                    <h1>
                        {estudiante.cedula}
                    </h1>
                    <p>{estudiante.nombre_completo}</p>
                    <p>Ciclo: <span>{estudiante.ciclo}</span></p>
                    <Button style={{

                        }} size="lg" variant="danger" onClick={handleDelete}>

                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                            Borrar</Button>
                    
                </Card>) :
                <h1>Estudiante no encontrado</h1>}

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