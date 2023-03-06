import MenuWrapper from '@/components/sidebar'
import React from 'react'
import EstudianteProyectoForm from '@/components/estudiantes_proyectosForm'
import axios from 'axios'
export default function NewEstudiante({ estudiantes, proyectos }) {
  return (
    <MenuWrapper >
      <EstudianteProyectoForm estudiantes={estudiantes} proyectos={proyectos} />
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