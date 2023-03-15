import MenuWrapper from '@/components/sidebar'
import React from 'react'
import EstudianteForm from '@/components/estudiantesForm';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
export default function EditEstudiante({ estudiante }) {
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
            {estudiante ?
                (<EstudianteForm estudianteFetch={estudiante} errorAlert={errorAlert} setError={setError} />)
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