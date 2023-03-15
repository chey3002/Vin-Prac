import MenuWrapper from '@/components/sidebar'
import React from 'react'
import axios from 'axios';
import ProyectoForm from '@/components/proyectoForm';
import { Alert } from 'react-bootstrap';
export default function EditProyectos({ proyecto }) {
    const [errorAlert, setError] = React.useState({
        code: "",
        message: "",
        show: false,
    })
    return (
        <MenuWrapper >
            {errorAlert.show ?

                <Alert variant="danger" onClose={() => setError({ ...errorAlert, show: false })} dismissible>
                    <Alert.Heading>Error: {errorAlert.code}</Alert.Heading>
                    <p>
                        {errorAlert.message}
                    </p>
                </Alert> : ""
            }
            {proyecto ?
                (<ProyectoForm proyectoFetch={proyecto} errorAlert={errorAlert} setError={setError} />)
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