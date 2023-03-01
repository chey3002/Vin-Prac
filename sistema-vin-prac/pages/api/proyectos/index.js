import { pool } from '../../../config/db'
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await getProyectos(req, res)


        case 'POST':
            return await saveProyectos(req, res)
    }

}

const getProyectos = async (req, res) => {
    const [result] = await pool.query('SELECT * FROM proyectos')
    return res.status(200).json(result);
}

const saveProyectos = async (req, res) => {
    const {
        catedra_integradora,
        proyecto_integrador,
        proyecto_servicio_comunitario,
        numero_de_horas_de_practicas,
        numero_de_estudiantes_que_deben_hacer_las_practicas,
        actividades_a_realizar,
        docente_tutor,
        instituciones_o_empresas,
        propuesta_en_la_que_va_a_participar,
        encargado_en_la_empresa,
        tipo_de_proyecto,
    } = req.body;
    console.log(req.body)

    try {
        const [result] = await pool.query('INSERT INTO proyectos SET?', {
            catedra_integradora,
            proyecto_integrador,
            proyecto_servicio_comunitario,
            numero_de_horas_de_practicas,
            numero_de_estudiantes_que_deben_hacer_las_practicas,
            actividades_a_realizar,
            docente_tutor,
            instituciones_o_empresas,
            propuesta_en_la_que_va_a_participar,
            encargado_en_la_empresa,
            tipo_de_proyecto,
        })
    } catch (error) {
        //el estudiante ya existe
        return res.status(500).json("Error:" + error.sqlState + " " + error.sqlMessage);
    }
    return res.status(200).json("Proyecto registrado con exito");
}