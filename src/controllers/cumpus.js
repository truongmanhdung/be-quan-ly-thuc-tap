import Cumpus from '../models/cumpus'

export const createCumpus = async(req,res) =>{
    const cumpus = Cumpus.create(req.body)
    res.status(200).json({
        cumpus,
        message:"Create cumpus successfully"
    })
}

export const getListCumpus = async(req,res) =>{
    const cumpusList = Cumpus.find()
    res.status(200).json({
        cumpusList,
        message:"Get list cumpus successfully"
    })
}

