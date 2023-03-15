import MenuWrapper from '@/components/sidebar'
import React from 'react'
import EstudianteProyectoForm from '@/components/estudiantes_proyectosForm'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
export default function NewEstudiante({ estudiantes, proyectos }) {
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
      <EstudianteProyectoForm estudiantes={estudiantes} proyectos={proyectos} errorAlert={errorAlert} setError={setError} />
    </MenuWrapper>
    
  )
}
export const getServerSideProps = async (context) => {
  const estudiantes = await axios.get(process.env['HOST'] + 'api/estudiantes')
  const proyectos = await axios.get(process.env['HOST'] + 'api/proyectos')


  return {
    props: {
      estudiantes: estudiantes.data,
      proyectos: proyectos.data
    }
  }
}