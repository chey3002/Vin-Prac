import MenuWrapper from '@/components/sidebar'
import React from 'react'
import axios from 'axios';
import EstudianteProyectoForm from '@/components/estudiantes_proyectosForm';
import { Alert } from 'react-bootstrap';
export default function EditEstudiantesProyectos({ estudiantes, proyectos, estudiantes_proyectos }) {
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
            {estudiantes_proyectos ?
                <EstudianteProyectoForm estudiantes={estudiantes} proyectos={proyectos} estudiante_proyectoFetch={estudiantes_proyectos} errorAlert={errorAlert} setError={setError} />
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