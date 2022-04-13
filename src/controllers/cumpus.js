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
    const cumpusList = await Cumpus.find();
    return res.status(200).json({
      cumpusList,
      message: "Get list cumpus successfully",
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};
