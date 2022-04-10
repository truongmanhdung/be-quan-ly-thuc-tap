const Student = require("../models/student");
export const report = async (req, res) => {
  const {
    attitudePoint,
    internShipTime,
    mssv,
    email,
    nameCompany,
    resultScore,
  } = req.body;
  const filter = { mssv: mssv, email: email };
  const findStudent = await Student.findOne(filter);
  console.log(attitudePoint, resultScore);
  try {
    if (!findStudent) {
      const err = {
        status: false,
        message: "Đã xảy ra lỗi! Vui đăng ký lại!",
      };
      res.status(404).send(err);
    }

    if (
      (findStudent.statusCheck === 0 &&
        findStudent.attitudePoint &&
        findStudent.resultScore) ||
      (findStudent.statusCheck === 1 &&
        findStudent.attitudePoint &&
        findStudent.resultScore)
    ) {
      const err = {
        status: false,
        message: "Thông tin báo cáo đã tồn tại và đang chờ xác nhận!",
      };
      res.status(500).send(err);
      return;
    }

    if (
      (findStudent.statusCheck === 1 && findStudent.CV && findStudent.form) ||
      (findStudent.statusCheck === 0 && findStudent.CV && findStudent.form)
    ) {
      const err = {
        status: false,
        message: "CV và biểu mẫu cần được duyệt trước khi nộp báo cáo!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      attitudePoint: attitudePoint,
      internshipTime: internShipTime,
      nameCompany: nameCompany,
      resultScore: resultScore,
      statusCheck: 0,
    };

    if (findStudent.statusCheck === 2 && findStudent.CV && findStudent.form) {
      const user = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Nộp báo cáo thành công" });
    }

    if (
      findStudent.statusCheck === 4 &&
      findStudent.attitudePoint &&
      findStudent.resultScore
    ) {
      const user = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Cập nhật báo cáo thành công" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin biểu!",
    });
  }
};

export const form = async (req, res) => {
  const { nameCompany, internShipTime, postCode, mssv, email } = req.body;
  const filter = { mssv: mssv, email: email };
  const findStudent = await Student.findOne(filter);

  try {
    if (!findStudent) {
      const err = {
        status: false,
        message: "Đã xảy ra lỗi! Vui lòng đăng ký lại!",
      };
      res.status(404).send(err);
    }
    if (findStudent.statusCheck < 2 && findStudent.CV) {
      const err = {
        status: false,
        message: "CV phải được duyệt trước khi nộp biểu mẫu!",
      };
      res.status(500).send(err);
      return;
    }

    if (findStudent.statusCheck < 2 && findStudent.form) {
      const err = {
        status: false,
        message: "Thông tin biểu mẫu đã tồn tại và đang chờ xác nhận!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      postCode: postCode,
      internShipTime: internShipTime,
      nameCompany: nameCompany,
      statusCheck: 0,
    };
    if (findStudent.statusCheck === 4 && findStudent.form && findStudent.CV) {
      await Student.findOneAndUpdate(filter, update, { new: true });
      res.status(200).send({ message: "Cập nhật biểu mẫu thành công" });
    }

    if (findStudent.statusCheck === 2 && findStudent.CV) {
      await Student.findOneAndUpdate(filter, update, { new: true });
      res.status(200).send({ message: "Nộp biểu mẫu thành công" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng nhập lại biểu mẫu" });
  }
};
