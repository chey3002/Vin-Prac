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

        <h1>Asignaciones</h1>
          <Input
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Buscar"            
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