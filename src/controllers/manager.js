import Manager from '../models/manager'

export const getListManager = async(req,res) =>{
  try {
    const manager = await Manager.find()
    res.status(200).json({
      manager,
      success:true
    })
  } catch (error) {
    res.json(error)
  }
} 

export const getManager = async(req,res) =>{
  try {
    const manager = await Manager.findById(req.params.id)
    res.status(200).json({
      manager,
      success:true
    })
  } catch (error) {
    res.json(error)
  }
} 

export const createManager = async(req,res) =>{
  try {
    const manager = await Manager.create(req.body)
    res.status(201).json({
      manager,
      message:"Tạo nhân viên quản lý sinh viên thực tập thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

export const updateManager = async(req,res) =>{
  try {
    const manager = await Manager.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json({
      manager,
      message:"Sửa thông tin nhân viên quản lý sinh viên thực tập thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

export const removeManager = async(req,res) =>{
  try {
    const manager = await Manager.findByIdAndRemove(req.params.id)
    res.status(200).json({
      manager,
      message:"Xóa nhân viên quản lý sinh viên thực tập thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

