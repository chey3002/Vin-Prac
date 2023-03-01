import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { Card } from 'react-bootstrap'


export default function IndexEstudiante({ estudiantes }) {
  return (
    <>
      <MenuWrapper >
        {estudiantes.map((estudiante) => (
          <Card style={{ margin: "10px 0 10px 0" }} key={estudiante.cedula}>
            <Link href={`/estudiantes/${estudiante.cedula}`}>
              <h1>
                {estudiante.cedula}
              </h1>
            </Link>
            <p>{estudiante.nombre_completo}</p>
            <p>Ciclo: <span>{estudiante.ciclo}</span></p>
          </Card>
        ))
        }
      </MenuWrapper>
    </>

  )
}
export const getServerSideProps = async (context) => {
  const res = await axios.get(process.env['HOST'] + 'api/estudiantes')

  return {
    props: {
      estudiantes: res.data
    }
  }
}