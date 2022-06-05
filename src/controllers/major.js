import Major from '../models/major'

export const getListMajor = async(req,res) =>{
  try {
    const majors = await Major.find()
    res.status(200).json({
      majors,
      success:true
    })
  } catch (error) {
    res.json(error)
  }
} 

export const getMajor = async(req,res) =>{
  try {
    const major = await Major.findById(req.params.id)
    res.status(200).json({
      major,
      success:true
    })
  } catch (error) {
    res.json(error)
  }
} 

export const createMajor = async(req,res) =>{
  try {
    const major = await Major.create(req.body)
    res.status(201).json({
      major,
      message:"Tạo ngành học thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

export const updateMajor = async(req,res) =>{
  try {
    const major = await Major.findOneAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json({
      major,
      message:"Sửa ngành học thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

export const removeMajor = async(req,res) =>{
  try {
    const major = await Major.findByIdAndRemove(req.params.id)
    res.status(200).json({
      major,
      message:"Xóa ngành học thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

