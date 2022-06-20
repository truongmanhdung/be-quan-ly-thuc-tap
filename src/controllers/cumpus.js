import Cumpus from "../models/cumpus";

export const createCumpus = async (req, res) => {
  try {
    const cumpus = await Cumpus.create(req.body);
    return res.status(200).json({
      cumpus,
      message: "Create cumpus successfully",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getListCumpus = async (req, res) => {
  try {
    const listCumpus = await Cumpus.find();
    return res.status(200).json({
      listCumpus,
      message: "Get list cumpus successfully",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateCumpus = async(req,res) =>{
  try {
    const cumpus = await Cumpus.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json({
      cumpus,
      message:"Sửa cơ sở thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}

export const removeCumpus = async(req,res) =>{
  try {
    const cumpus = await Cumpus.findByIdAndRemove(req.params.id)
    res.status(200).json({
      cumpus,
      message:"Xóa cơ sở thành công"
    })
  } catch (error) {
    res.json({
      error
    })
  }

}
