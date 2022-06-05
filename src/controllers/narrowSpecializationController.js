import narrow from "../models/narrow_specialization";

export const getNarrow = async (req, res) => {
  const data = await narrow.find().populate("majors_id");
  res.status(200).json({ listNarrow: data });
};
export const insertNarrow = async (req, res) => {
  try {
    console.log(req);
    const reqName = req.body.name.toLowerCase();
    const findName = await narrow.findOne({
      name: reqName,
    });

    if (findName) {
      return res.status(500).send({
        message: "Tên chuyên ngành hẹp đã tồn tại, vui lòng đặt tên khác!",
      });
    }
    const data = await new narrow(req.body).save();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateNarrow = async (req, res) => {
  try {
    const query = { _id: req.body.id };
    const find = await narrow.findOne(query);
    const findNarrow = await narrow.find();
    const reqName = req.body.name.toLowerCase();
    console.log(findNarrow);
    const findName = await narrow.findOne({
      name: reqName,
    });

    findNarrow.map((item) => {
      if (findName === item.name.toLowerCase()) {
        return res.status(500).send({
          message: "Tên kỳ đã tồn tại, vui lòng đặt tên khác!",
        });
      }
    });

    if (find) {
      const data = await narrow.findOneAndUpdate(query, req.body);
      res.status(200).json(data);
    } else {
      res.status(500).json({
        message: "Ngành hẹp không tồn tại!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};
