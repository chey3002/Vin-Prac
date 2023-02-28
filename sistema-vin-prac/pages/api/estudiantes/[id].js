export default function handler(req, resp){
    return resp.status(200).json("un estudiante: "+req.query.id)
}