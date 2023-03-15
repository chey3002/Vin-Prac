import { pool } from "@/config/db";

export default async function handler(req, resp) {

    switch (req.method) {
        case "GET":
            return await getEstudiantes(req, resp);
        case "DELETE":
            return await deleteEstudiantes(req, resp);
        case "PUT":
            return await updateEstudiantes(req, resp);
        default:
            break;

    }

}

const getEstudiantes = async (req, resp) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query(`SELECT * FROM estudiantes WHERE cedula = "${id}"`);
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

const deleteEstudiantes = async (req, resp) => {
    const { id } = req.query;
    try {
        const result = await pool.query(`DELETE FROM estudiantes WHERE cedula = "${id}"`);
        return resp.status(204).json()
    } catch (error) {
        return resp.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }
}
const updateEstudiantes = async (req, resp) => {
    const { id } = req.query;
    try {
        const [result] = await pool.query("Update estudiantes SET ? where cedula = ?", [req.body, id]);
        return resp.status(204).json()
    } catch (error) {
        return resp.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });
    }


}