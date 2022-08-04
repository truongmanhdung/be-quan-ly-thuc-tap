import ConfigTime from "../models/configTime";

export const handleSetTimeRequest = async (req, res) => {
  const { startTime, endTime, typeNumber, semester_id, campus_id } = req.body;
  try {
    const timeRequest = await ConfigTime.findOne({
      typeNumber: typeNumber,
      semester_id,
      campus_id
    });
    if (!timeRequest) {
      const time = await ConfigTime.create(req.body);
      res.status(200).json({
        message: "create time success",
        time: time,
      });
    } else {
      const time = await ConfigTime.findOneAndUpdate(
        { typeNumber: typeNumber, semester_id, campus_id },
        { startTime: startTime, endTime: endTime }
      );
      res.status(200).json({
        message: "update time success",
        time: time,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getListTypeSetTime = async (req, res) => {
  try {
    const { semester_id,campus_id } = req.query;
    const time = await ConfigTime.find({ semester_id, campus_id });
    res.status(200).json({
      message: "time success",
      time: time,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getOneTypeSetTime = async (req, res) => {
  const { typeNumber, semester_id, campus_id } = req.query;
  try {
    const time = await ConfigTime.findOne({ typeNumber, semester_id, campus_id });
    res.status(200).json({
      message: "time success",
      time: time,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
