import ConfigTime from "../models/configTime";

export const handleSetTimeRequest = async (req, res) => {
  const { startTime, endTime, typeRegister } = req.body;
  const timeRequest = await ConfigTime.findOne({ typeRegister });
  if (!timeRequest) {
    const time = await ConfigTime.create(req.body);
    res.status(200).json({
      message: "create time success",
      time: time,
    });
  } else {
    const time = await ConfigTime.findOneAndUpdate(
      { typeRegister },
      { startTime, endTime }
    );
    res.status(200).json({
      message: "update time success",
      time: time,
    });
  }
};

export const getTimeRequestForm = async (req, res) => {
  const { formcheck } = req.params;
  try {
    const time = await ConfigTime.findOne({ typeRegister: Number(formcheck) });
    res.status(200).json({
      time,
    });
  } catch (error) {
    res.status(500).json({
      message: "get time fail",
    });
  }
};
