const Student = require("../models/student");
import moment from "moment";
export const reportFormStudent = async (req, res) => {
  const { attitudePoint, internShipTime, mssv, nameCompany, resultScore } =
    req.body;
  const filter = { mssv: mssv };
  const findStudent = await Student.findOne(filter);
  console.log(findStudent);
  try {
    if (!findStudent) {
      const err = {
        status: false,
        message: "Mã số sinh viên của bạn không đúng",
      };
      res.status(404).send(err);
    }
    if (!findStudent.form || !findStudent.CV) {
      const err = {
        status: false,
        message: "Vui lòng nộp CV và biểu mẫu trước khi nộp báo cáo!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      attitudePoint: attitudePoint,
      internshipTime: internShipTime,
      nameCompany: nameCompany,
      resultScore: resultScore,
    };

    const user = await Student.findOneAndUpdate(filter, update, { new: true });
    res.status(200).send({ message: "Cập nhật báo cáo thành công" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng nhập lại báo cáo" });
  }
};

export const reportForm = async (req, res) => {
  const { nameCompany, internShipTime, postCode, mssv, form } = req.body;
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
        message: "Vui lòng nộp CV trước khi nộp biểu mẫu!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      postCode: postCode,
      internShipTime: internShipTime,
      nameCompany: nameCompany,
      form: form,
    };

    const user = await Student.findOneAndUpdate(filter, update, { new: true });
    res.status(200).send({ message: "Cập nhật biểu mẫu thành công" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng nhập lại biểu mẫu" });
  }
};
