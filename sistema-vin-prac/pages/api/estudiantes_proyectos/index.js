import { pool } from '../../../config/db'
export default async function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return await getEstudiantesProyectos(req, res)


        case 'POST':
            return await saveEstudianteProyecto(req, res)
    }

}

const getEstudiantesProyectos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT `estudiantes_proyectos`.*, `estudiantes`.`ciclo`, `estudiantes`.`nombre_completo`, `estudiantes`.`unidad_academica`, `proyectos`.`catedra_integradora`, `proyectos`.`proyecto_integrador`, `proyectos`.`proyecto_servicio_comunitario`, `proyectos`.`numero_de_horas_de_practicas`, `proyectos`.`numero_de_estudiantes_que_deben_hacer_las_practicas`, `proyectos`.`actividades_a_realizar`, `proyectos`.`docente_tutor`, `proyectos`.`instituciones_o_empresas`, `proyectos`.`propuesta_en_la_que_va_a_participar`, `proyectos`.`encargado_en_la_empresa`, `proyectos`.`tipo_de_proyecto` FROM`estudiantes_proyectos` LEFT JOIN`estudiantes` ON`estudiantes_proyectos`.`cedula` = `estudiantes`.`cedula` LEFT JOIN`proyectos` ON`estudiantes_proyectos`.`id_proyecto` = `proyectos`.`id`; ')
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