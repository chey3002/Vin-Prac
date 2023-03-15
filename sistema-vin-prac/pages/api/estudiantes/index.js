import { pool } from '../../../config/db'
export default async function handler(req, res) {
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
        return res.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });

    }

}

const saveEstudiante = async (req, res) => {
    const { cedula, ciclo, nombre_completo, unidad_academica } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO estudiantes SET?', {
            cedula,
            ciclo,
            nombre_completo,
            unidad_academica
        })

    } catch (error) {
        return res.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }

    return res.status(200).json("Estudiante registrado con éxito");
}