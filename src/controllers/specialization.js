import Specialization from '../models/specialization'

export const createSpecialization = async(req,res)=>{
    const specialization = await Specialization.create(req.body)
    res.status(200).json({
        specialization,
        message:"Create specialization successfully"
    })
}

export const getListSpecialization = async(req,res)=>{
    const listSpecialization = await Specialization.find()
    res.json({
        listSpecialization,
        message:"Get list specialization successfully"
    })
}