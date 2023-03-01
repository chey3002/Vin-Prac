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
    const [result] = await pool.query('SELECT * FROM estudiantes')
    return res.status(200).json(result);
}

const saveEstudiante = async (req, res) => {
    const { nroCedula, ciclo, nombreCompleto } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO estudiantes SET?', {
            cedula: nroCedula,
            ciclo,
            nombre_completo: nombreCompleto
        })

    } catch (error) {
        //el estudiante ya existe
        if (error.sqlState === '23000') {
            return res.status(299).json("El estudiante ya ha sido registrado");

        } else {
            return res.status(500).json("Error:" + error.sqlState + " " + error.sqlMessage);
        }
    }

    return res.status(200).json("Estudiante registrado con exito");
}