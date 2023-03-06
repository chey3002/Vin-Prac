import {pool} from '../../../config/db'
export default async function  handler(req, res) {
    switch (req.method) { 
        case 'GET':
            return await getEstudiantes(req, res)
            

        case 'POST':
            return await saveEstudiante(req, res)
    }

}

const getEstudiantes = async (req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM estudiantes')
        return res.status(200).json(result);
    } catch (error) {
        return resp.status(500).json(error)

    }    
    
}

const saveEstudiante = async (req, res) => {
    const { cedula, ciclo, nombre_completo } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO estudiantes SET?', {
            cedula,
            ciclo,
            nombre_completo
        })

    } catch (error) {
        //el estudiante ya existe
        if (error.sqlState === '23000') {
            return res.status(299).json("El estudiante ya ha sido registrado");

        } else {
            return resp.status(500).json(error)
        }
    }

    return res.status(200).json("Estudiante registrado con exito");
}