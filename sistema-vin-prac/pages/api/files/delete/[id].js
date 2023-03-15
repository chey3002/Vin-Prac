import formidable from "formidable"
import path from "path"
import fs from "fs/promises"


export default async function handler(req, res) {
    const { id } = req.query;
    const [id_ep, cedula, tipo] = id.split("_");//"1_0105599385_32"
    const { item }=req.body
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/files/" + cedula))
        await fs.unlink(path.join( process.cwd() + "/public", "/files/" + cedula+"/"+item))
    } catch (error) {
        return res.status(500).json({
            code: error.sqlState,
            message: error.sqlMessage,
        });    }
    res.json({ done: "ok" })
}
