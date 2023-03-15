import formidable from "formidable"
import path from "path"
import fs from "fs/promises"

export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req, saveLocally, id) => {
    const [id_ep, cedula, tipo] = id.split("_");//"1_0105599385_32"
    const options = {}
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/files/" + cedula)
        options.filename = (name, ext, path, form) => {
            console.log(name, ext, path)
            const extension = path.originalFilename.split(".")[path.originalFilename.split(".").length - 1]
            return id+ "." + extension;
        }
    }
    options.maxFileSize = 4000 * 1024 * 1024
    const form = formidable(options)
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
        })
    })
}

const handler = async (req, res) => {
    const { id } = req.query;
    const [id_ep, cedula,tipo] = id.split("_");//"1_0105599385_32"
    
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/files/"+cedula))
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/files/" + cedula))
    }
    try {
        await readFile(req, true, id)
        res.json({ done: "ok" })
    } catch (error) {
        return res.status(500).json({
            code: "500",
            message: "Error al crear el archivo",
        });
    }
    
    
}

export default handler
