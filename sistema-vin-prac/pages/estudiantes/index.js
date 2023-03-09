import MenuWrapper from '@/components/sidebar'
import { Table, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import { Card } from 'react-bootstrap'
import { estudiantesColumns } from '@/config/columnas'
import { useTableSearch } from '@/config/useTableSearch'
const fetchEstudiantes = async () => {
  const { data } = await axios.get(process.env['BASE_URL'] + 'api/estudiantes')

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
        
        <h1>Estudiantes</h1>
        <Card style={{ padding: "10px" }}>
          <Input
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Buscar"
            style={{ position: "sticky" }}
          />
          <Table
            dataSource={filteredData}
            columns={estudiantesColumns}
            loading={loading}
            pagination={{ defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10', '20', '30'] }}
          />        </Card>
      </MenuWrapper>
    </>

  )
}
