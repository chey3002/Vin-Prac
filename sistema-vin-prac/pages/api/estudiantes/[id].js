import { pool } from "@/config/db";

export default async function handler(req, resp) {
    
    switch (req.method) {
        case "GET":
            return await getEstudiantes(req, resp);
        case "DELETE":
            return await deleteEstudiantes( req, resp);
        default:
            break;
        
    }
   
}

const getEstudiantes = async (req, resp) => {
    const { id } = req.query;
    const [result] = await pool.query(`SELECT * FROM estudiantes WHERE cedula = "${id}"`);

    if (result.length === 0) {
        return resp.status(200).json(null)

    } else {
        return resp.status(200).json(result)
    }
}

const deleteEstudiantes = async (req, resp) => {
    const { id } = req.query;
    const result = await pool.query(`DELETE FROM estudiantes WHERE cedula = "${id}"`);
    console.log(result);
    return resp.status(204).json()
}