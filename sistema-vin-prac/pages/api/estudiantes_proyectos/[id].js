import { pool } from "@/config/db";

export default async function handler(req, resp) {
    
    switch (req.method) {
        case "GET":
            return await getEstudiantesProyectos(req, resp);
        case "DELETE":
            return await deleteEstudiantesProyectos(req, resp);
        case "PUT":
            return await updateEstudiantesProyectos(req, resp);
        default:
            break;
        
    }
   
}

const getEstudiantesProyectos = async (req, resp) => {
    const { id } = req.query;



    try {
        const [result] = await pool.query(`SELECT * FROM estudiantes_proyectos WHERE id_ep = "${id}"`);

        if (result.length === 0) {
            return resp.status(200).json(null)

        } else {
            return resp.status(200).json(result)
        }
    } catch (error) {
        return resp.status(500).json(error)

    }    
    
    
}

const deleteEstudiantesProyectos = async (req, resp) => {
    const { id } = req.query;

    try {
        const result = await pool.query(`DELETE FROM estudiantes_proyectos WHERE id_ep = "${id}"`);
        return resp.status(204).json()
    } catch (error) {
        return resp.status(500).json(error)
    }
    
}
const updateEstudiantesProyectos = async (req, resp) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query("Update estudiantes_proyectos SET ? where id_ep = ?", [req.body, id]);
        return resp.status(204).json()
    } catch (error) {
        return resp.status(500).json(error)
    }


}