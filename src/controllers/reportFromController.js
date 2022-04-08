const Student = require("../models/student");

export const reportFormStudent = async (req, res) => {
  const { attitudePoint, internShipTime, mssv, nameCompany, resultScore } =
    req.body;
  const filter = { mssv: mssv };
  const findStudent = await Student.findOne(filter);

  try {
    if (!findStudent) {
      const err = {
        status: false,
        message: "Mã số sinh viên của bạn không đúng",
      };
      res.status(404).send(err);
    }

    if (!findStudent.CV) {
      const err = {
        status: false,
        message: "Vui lòng nộp CV trước khi nộp báo cáo!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      attitudePoint: attitudePoint,
      internShipTime: internShipTime,
      nameCompany: nameCompany,
      resultScore: resultScore,
    };

    const user = await Student.findOneAndUpdate(filter, update, { new: true });
    res.status(200).send({ message: "Cập nhật báo cáo thành công" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng nhập lại biểu mẫu" });
  }
};
