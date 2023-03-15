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
