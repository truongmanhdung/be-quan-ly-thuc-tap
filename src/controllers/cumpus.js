import Cumpus from '../models/cumpus';

export const createCumpus = async (req, res) => {
  const campusValid = await Cumpus.findOne({
    "name": req.body.name,
  });
  try {
    if (campusValid !== null) {
      res.status(202).json({
        success: false,
        message: 'Cơ sở đã tồn tại',
      });
      return;
    } else {
      const cumpus = await Cumpus.create(req.body);
      return res.status(200).json({
        cumpus,
        success: true,
        message: 'Thành công',
      });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getListCumpus = async (req, res) => {
  try {
    const listCumpus = await Cumpus.find().sort({createdAt: -1}).exec();
    return res.status(200).json({
      listCumpus,
      message: 'Get list cumpus successfully',
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getCumpus = async (req, res) => {
  try {
    const cumpus = await Cumpus.findById(req.params.id);
    return res.status(200).json({
      cumpus,
      message: 'Get cumpus successfully',
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const updateCumpus = async (req, res) => {
  const campusValid = await Cumpus.findOne({
    name: req.body.name,
  });
  try {
    if (campusValid !== null) {
      res.status(202).json({
        success: false,
        message: 'Cơ sở đã tồn tại',
      });
      return;
    } else {
      const cumpus = await Cumpus.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json({
        cumpus,
        success: true,
        message: 'Sửa cơ sở thành công',
      });
    }
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const removeCumpus = async (req, res) => {
  try {
    const cumpus = await Cumpus.findByIdAndRemove(req.params.id);
    res.status(200).json({
      cumpus,
      success: false,
      message: 'Xóa cơ sở thành công',
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};
