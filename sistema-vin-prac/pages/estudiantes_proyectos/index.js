import MenuWrapper from '@/components/sidebar'
import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import { estudiantesProyectosColumns } from '@/config/columnas'
import { Table} from 'antd'
import * as XLSX from 'xlsx'

export default function IndexEstudiante({ estudiantes_proyectos }) {
  const [filteredData, setFilteredData] = React.useState(estudiantes_proyectos);

  const setupExcel = (data) => { 
    const ExcelArray = [
      ["1.    DATOS GENERALES",],
      ["",],
      ["Unidad Académica de:", data[0].unidad_academica, "", ],
      ["Período Lectivo:", ],
      ["Carrera:", ],
      ["Área: Práctica Laboral / Práctica de Servicio Comunitaria"],
      ["Docente Responsable de Prácticas:", data[0].docente_tutor, ],
      ["", ],];
    ExcelArray.push(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
    ExcelArray.push(["No.",
      "Ciclo", "Cátedra Integradora",
      "Proyecto Integrador",
      "Proyecto de Servicio Comunitario",
      "# de Horas de Práctica",
      "# de estudiantes que deben hacer prácticas",
      "Actividades a realizar ",
      "Nómina de estudiantes asignados",
      "Docente Tutor asignado por grupo de estudiantes",
      "Instituciones o Empresas",
      "Propuesta en la que va a participar"])
    
    data.map((row, i) => (ExcelArray.push([
      i + 1,
      row.ciclo,
      row.catedra_integradora,
      row.proyecto_integrador,
      row.proyecto_servicio_comunitario,
      row.numero_de_horas_de_practicas,
      row.numero_de_estudiantes_que_deben_hacer_las_practicas,
      row.actividades_a_realizar,
      row.nombre_completo,
      row.docente_tutor,
      row.instituciones_o_empresas,
      row.propuesta_en_la_que_va_a_participar])))
    console.log(ExcelArray);
    return ExcelArray;
  }
  const handleClick = () => {
    if (filteredData.length <= 0) {
      alert("No hay datos para exportar");

      return;
    } 
    console.log(filteredData);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(setupExcel(filteredData));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Documento31');
    XLSX.writeFile(workbook, 'Documento31.xlsx');
  }
  return (
    <>
      <MenuWrapper >
        <h1>Asignaciones</h1>
        <Button variant='success' onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-spreadsheet" viewBox="0 0 16 16">
            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h3v2H6zm4 0v-2h3v1a1 1 0 0 1-1 1h-2zm3-3h-3v-2h3v2zm-7 0v-2h3v2H6z" />
          </svg>
          Exportar</Button>

          <Table
          dataSource={estudiantes_proyectos}
          columns={estudiantesProyectosColumns}
          onChange={(pagination, filters, sorter, extra) => setFilteredData(extra.currentDataSource)}
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