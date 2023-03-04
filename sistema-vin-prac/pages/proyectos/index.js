import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import React from 'react'
import { Card } from 'react-bootstrap'
import { proyectosColumns } from '@/config/columnas'
import { Table, Input } from 'antd'
import { useTableSearch } from '@/config/useTableSearch'

const fetchEstudiantes = async () => {
  const { data } = await axios.get(process.env['BASE_URL'] + 'api/proyectos')

  return { data };
};

export default function IndexProyecto() {
  const [searchVal, setSearchVal] = React.useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchEstudiantes
  });

  return (
    <>
      <MenuWrapper >
        {/* {proyectos.map((proyecto) => (
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
        } */}
        <h1>Proyectos</h1>
        <Card>
          <Input
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Buscar"
            enterButton
            style={{ position: "sticky" }}
          />
          <Table
            dataSource={filteredData}
            columns={proyectosColumns}
            loading={loading}
            pagination={{ defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
          />
        </Card>
      </MenuWrapper>
    </>

  )
}
