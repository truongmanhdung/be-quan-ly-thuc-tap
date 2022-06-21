import narrow from "../models/narrow_specialization";
import student from "../models/student";

export const getNarrow = async (req, res) => {
  const data = await narrow.find().populate("id_majors");
  res.status(200).json(data);
};
export const insertNarrow = async (req, res) => {
  try {
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
    const _findNarrow = await narrow.findOne({ _id: req.body.id });
    const findNarrowName = await narrow.find({});
    if (!_findNarrow) {
      return res.status(200).json({
        message: "Chuyên ngành hẹp không tồn tại",
      });
    }
    if (req.body.name.toLowerCase() === _findNarrow.name.toLowerCase()) {
      await narrow.findByIdAndUpdate(
        {
          _id: req.body.id,
        },
        req.body
      );
      return res.status(200).json({
        message: "Sửa thành công",
      });
    }
    for (let i = 0; i < findNarrowName.length; i++) {
      if (
        findNarrowName[i].name.toLowerCase() === req.body.name.toLowerCase()
      ) {
        return res.status(500).json({
          message: "Tên chuyên ngành hẹp đã tồn tại",
        });
      }
    }
    await narrow.findByIdAndUpdate(
      {
        _id: req.body.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "Sửa thành công",
    });
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};

export const deleteNarrow = async (req, res) => {
  try {
    console.log(req.body);
    const findNarrows = await narrow.findOne({
      _id: req.body.id,
    });
    console.log(findNarrows);
    const findStudentNarrow = await student.find({
      narrow: req.body.id,
    });
    console.log("findStudentNarrow: ", findStudentNarrow);
    if (!findNarrows) {
      // console.log(true);
      return res.status(404).json({
        message: "Ngành hẹp không tồn tại!",
      });
    }
    if (findStudentNarrow) {
      return res.status(500).json({
        message: "Ngành hẹp có sinh viên không được xoá",
      });
    } else {
      const deleteManyUserNarrow = await student.deleteMany({ narrow: null });
      if (deleteManyUserNarrow) {
        return res.status(200).json({
          message: "Xoá thành công",
        });
      } else {
        res.status(500).json({
          message: "Có lỗi vui lòng thử lại sau",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Có lỗi vui lòng thử lại sau",
    });
  }
};
