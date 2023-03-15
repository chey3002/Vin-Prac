import MenuWrapper from '@/components/sidebar'
import React from 'react'
import ProyectoForm from '@/components/proyectoForm';
import { Alert } from 'react-bootstrap';
export default function NewEstudiante() {
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
      <ProyectoForm errorAlert={errorAlert} setError={setError} />
    </MenuWrapper>
    
  )
}
