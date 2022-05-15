import semester from "../models/semester"

export const getSemester = async (req, res) => {
    try {
        const data = await semester.find().sort({createdAt: -1}).exec()
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
        
}
export const insertSemester = async (req,res) => {
    try {
        const data = await new semester(req.body).save()
        res.status(200).json(data)
    } catch (error) {
        res.json("Loi")
    }
}