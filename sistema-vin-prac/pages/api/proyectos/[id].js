import { pool } from "@/config/db";

export default async function handler(req, resp) {

    switch (req.method) {
        case "GET":
            return await getProyecto(req, resp);
        case "DELETE":
            return await deleteProyecto(req, resp);
        case "PUT":
            return await updateProyecto(req, resp);
        default:
            break;

    }

}

const getProyecto = async (req, resp) => {
    const { id } = req.query;

    try {
        const [result] = await pool.query(`SELECT * FROM proyectos WHERE id = "${id}"`);
        if (result.length === 0) {
            return resp.status(200).json(null)
        } else {
            return resp.status(200).json(result)
        }
    } catch (error) {
        return resp.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }
}

const deleteProyecto = async (req, resp) => {
    const { id } = req.query;
    try {
        const result = await pool.query(`DELETE FROM proyectos WHERE id = "${id}" `);
        return resp.status(204).json()
    } catch (error) {
        return resp.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }
}
const updateProyecto = async (req, resp) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query('Update proyectos SET ? where id = ?', [req.body, id]);
        return resp.status(204).json()
    } catch (error) {
        //console.log(error);
        return resp.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }


}