import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { Button, Card } from 'react-bootstrap'


export default function IndexProyecto({ proyectos }) {
  return (
    <>
      <MenuWrapper >
        {proyectos.map((proyecto) => (
          <Card style={{ margin: "10px 0 10px 0" }} key={proyecto.id}>
            <Link href={`/proyectos/${proyecto.id}`}>
              <h1>
                Institución: {proyecto.instituciones_o_empresas}
              </h1>
            </Link>
            <p>id:{proyecto.id}</p>
              <p>catedra_integradora:{proyecto.catedra_integradora}</p>
              <p>proyecto_integrador:{proyecto.proyecto_integrador}</p>
              <p>proyecto_servicio_comunitario:{proyecto.proyecto_servicio_comunitario}</p>
              <p>numero_de_horas_de_practicas:{proyecto.numero_de_horas_de_practicas}</p>
              <p>numero_de_estudiantes_que_deben_hacer_las_practicas:{proyecto.numero_de_estudiantes_que_deben_hacer_las_practicas}</p>
              <p>actividades_a_realizar:{proyecto.actividades_a_realizar}</p>
              <p>docente_tutor:{proyecto.docente_tutor}</p>
              <p>propuesta_en_la_que_va_a_participar:{proyecto.propuesta_en_la_que_va_a_participar}</p>
              <p>encargado_en_la_empresa:{proyecto.encargado_en_la_empresa}</p>
              <p>tipo_de_proyecto:{proyecto.tipo_de_proyecto}</p>
          </Card>
        ))
        }
      </MenuWrapper>
    </>

  )
}
export const getServerSideProps = async (context) => {
  const res = await axios.get(process.env['HOST'] + 'api/proyectos')

  return {
    props: {
      proyectos: res.data
    }
  }
}