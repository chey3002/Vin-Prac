import MenuWrapper from '@/components/sidebar'
import React from 'react'
import EstudianteForm from '@/components/estudiantesForm';
import csvToJson from 'convert-csv-to-json';
import { Alert, Button, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function NewEstudiante() {
  const router = useRouter();
  const [urlFile, setUrlFile] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState();


  const [errorAlert, setError] = React.useState({
    code: "",
    message: "",
    show: false,
  })
  const handleFile = async () => {
    try {
      if (!selectedFile) return;
      const { data } = await axios.get(urlFile)
      const csvFile = csvToJson.utf8Encoding().fieldDelimiter(',').supportQuotedField(true).csvStringToJson(data)
      csvFile.map(async (row) => {
        try {
          const res = await axios.post('/api/estudiantes', row)
        } catch (error) {
          if (Object.entries(error.response.data).length === 0) {
            console.log("hay un error")

            console.log(error);
            setError({
              ...errorAlert,
              code: error.code,
              message: error.message,
              show: true,
            })
          } else {
            console.log("hay un error")
            setError({
              ...errorAlert,
              code: error.response.data.code,
              message: error.response.data.message,
              show: true,
            })
          }
        }
      })
      router.push("/estudiantes")
    } catch (error) {
      if (Object.entries(error.response.data).length === 0) {
        console.log("hay un error")

        console.log(error);
        setError({
          ...errorAlert,
          code: error.code,
          message: error.message,
          show: true,
        })
      } else {
        console.log("hay un error")
        setError({
          ...errorAlert,
          code: error.response.data.code,
          message: error.response.data.message,
          show: true,
        })
      }
    }


  }
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
      <EstudianteForm errorAlert={errorAlert} setError={ setError} />
      <br />
      <Card>
        <h2>Subida por lotes</h2>
        <Form.Control name="file" type="file" onChange={
          ({ target }) => {
            if (target.files) {
              const file = target.files[0];
              setUrlFile(URL.createObjectURL(file))
              setSelectedFile(file)
            }
          }
        }
          accept=".csv"
        />
        <div>
          <Button variant="primary" type="submit" onClick={handleFile}>
            Cargar estudiantes por lote
          </Button>
        </div>
        <br />
        <div>
          <Link href={"/Recursos/plantilla_por_lote.csv"}>
            <p className='btn btn-success'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-download" viewBox="0 0 16 16">
                <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
              </svg>
              Descargue la plantilla aquí!
              
            </p>
          </Link>
        </div>
      </Card>
    </MenuWrapper>

  )
}
