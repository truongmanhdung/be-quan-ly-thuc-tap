import ConfigTime from "../models/configTime";

export const handleSetTimeRequest = async (req, res) => {
  const { startTime, endTime, typeNumber } = req.body;
  try {
    const timeRequest = await ConfigTime.findOne({ typeNumber:typeNumber });
    if (!timeRequest) {
      const time = await ConfigTime.create(req.body);
      res.status(200).json({
        message: "create time success",
        time: time,
      });
    } else {
      const time = await ConfigTime.findOneAndUpdate(
        { typeNumber:typeNumber },
        { startTime:startTime, endTime:endTime }
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

export const getTimeSelect = async (req, res) => {};

export const getListTypeSetTime = async (req,res) =>{
  try {
    const listTypeSetTime = await ConfigTime.find()
    res.status(200).json(listTypeSetTime)
  } catch (error) {
    res.status(400).json(error)
  }
}
