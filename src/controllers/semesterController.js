import semester from "../models/semester";
export const getSemester = async (req, res) => {
  try {
    const data = await semester.find();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const getDefaultSemester = async (req, res) => {
  try {
    const data = await semester.findOne({
      $and: [
        { start_time: { $lte: new Date() } },
        { date_time: { $gte: new Date() } },
      ],
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

export const updateSemester = async (req, res) => {
  try {
    const query = { _id: req.body.id };
    const find = await semester.findOne(query);
    const reqName = req.body.name.toLowerCase();

    const findName = await semester.findOne({
      name: reqName,
    });

    if (findName) {
      return res.status(500).send({
        message: "Tên kỳ đã tồn tại, vui lòng đặt tên khác!",
      });
    }

    if (find) {
      const data = await semester.findOneAndUpdate(query, req.body);
      res.status(200).json(data);
    } else {
      res.status(500).json({
        message: "Kỳ không tồn tại!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};

export const insertSemester = async (req, res) => {
  try {
    const reqName = req.body.name.toLowerCase();
    const findName = await semester.findOne({
      name: reqName,
    });

    if (findName) {
      return res.status(500).send({
        message: "Tên kỳ đã tồn tại, vui lòng đặt tên khác!",
      });
    }
    const data = await new semester(req.body).save();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
