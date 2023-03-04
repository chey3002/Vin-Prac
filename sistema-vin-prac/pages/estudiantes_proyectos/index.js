import { bordeSemaforizado } from '@/components/BordeSemaforizado'
import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { Card } from 'react-bootstrap'
import { estudiantesProyectosColumns } from '@/config/columnas'
import { useTableSearch } from '@/config/useTableSearch'
import { Table, Input } from 'antd'

const fetchEstudiantes = async () => {
  const { data } = await axios.get(process.env['BASE_URL'] + 'api/estudiantes_proyectos')

  return { data };
};

export default function IndexEstudiante() {
  const [searchVal, setSearchVal] = React.useState(null);

  const { filteredData, loading } = useTableSearch({
    searchVal,
    retrieve: fetchEstudiantes
  });
  return (
    <>
      <MenuWrapper >
        {/* {estudiantes_proyectos.map((estudiante_proyecto) => (
          <Card style={{ margin: "10px 0 10px 0", border: bordeSemaforizado(estudiante_proyecto.fecha_limite) }} key={estudiante_proyecto.id_ep}>
            <Link href={`/estudiantes_proyectos/${estudiante_proyecto.id_ep}`}>
              <h1>
                {estudiante_proyecto.cedula}
              </h1>
            </Link>
            <h1>{estudiante_proyecto.nombre_completo}</h1>
            <p>id_proyecto:{estudiante_proyecto.id_proyecto}</p>
            <p>id:{estudiante_proyecto.id_ep}</p>
            <p>Fecha limite:{(new Date(Date.parse(estudiante_proyecto.fecha_limite))).toLocaleString()}</p>
          </Card>
        ))
        } */}
        <h1>Asignaciones</h1>
          <Input
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Buscar"

            enterButton
            style={{ position: "sticky" }}
          />
          <Table
            dataSource={filteredData}
            columns={estudiantesProyectosColumns}
            loading={loading}
            pagination={{ defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
          />       
      </MenuWrapper>
    </>

  )
}
export const getServerSideProps = async (context) => {
  const res = await axios.get(process.env['HOST'] + 'api/estudiantes_proyectos')

  return {
    props: {
      estudiantes_proyectos: res.data
    }
  }
}