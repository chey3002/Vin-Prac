import { pool } from "@/config/db";

export default async function handler(req, resp) {
    
    switch (req.method) {
        case "GET":
            return await getProyecto(req, resp);
        case "DELETE":
            return await deleteProyecto( req, resp);
        default:
            break;
        
    }
   
}

const getProyecto = async (req, resp) => {
    const { id } = req.query;
    const [result] = await pool.query(`SELECT * FROM proyectos WHERE id = "${id}"`);

    if (result.length === 0) {
        return resp.status(200).json(null)

    } else {
        return resp.status(200).json(result)
    }
}

const deleteProyecto = async (req, resp) => {
    const { id } = req.query;
    const result = await pool.query(`DELETE FROM proyectos WHERE id = "${id}"`);
    console.log(result);
    return resp.status(204).json()
}