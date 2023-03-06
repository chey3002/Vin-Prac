import {pool} from '../../../config/db'
export default async function  handler(req, res) {
    switch (req.method) { 
        case 'GET':
            return await getEstudiantesProyectos(req, res)
            

        case 'POST':
            return await saveEstudianteProyecto(req, res)
    }

}

const getEstudiantesProyectos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM estudiantes_proyectos JOIN estudiantes ON estudiantes_proyectos.cedula = estudiantes.cedula JOIN proyectos ON estudiantes_proyectos.id_proyecto = proyectos.id; ')
        return res.status(200).json(result);
    } catch (error) {
        return resp.status(500).json(error)
    }

    
}

const saveEstudianteProyecto = async (req, res) => {
    const { cedula, id_proyecto, fecha_limite } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO estudiantes_proyectos SET?', {
            cedula,
            id_proyecto,
            fecha_limite
        })
    } catch (error) {
        return resp.status(500).json(error)
    }

    return res.status(200).json("Estudiante Proyecto registrado con exito");
}