const Student = require("../models/student");
export const report = async (req, res) => {
  const {
    attitudePoint,
    internShipTime,
    mssv,
    email,
    report,
    nameCompany,
    resultScore,
  } = req.body;
  const filter = { mssv: mssv, email: email };
  const findStudent = await Student.findOne(filter);

  try {
    if (!findStudent) {
      const err = {
        status: false,
        message: "Đã xảy ra lỗi! Vui đăng ký lại!",
      };
      res.status(404).send(err);
    }

    const nameCompanyD = findStudent.nameCompany === nameCompany;

    if (!nameCompanyD) {
      const err = {
        message: "Tên công ty không khớp với biểu mẫu!",
      };
      res.status(500).send(err);
      return;
    }

    const update = {
      attitudePoint: attitudePoint,
      internshipTime: internShipTime,
      nameCompany: nameCompany,
      resultScore: resultScore,
      report: report,
      statusCheck: 7,
    };

    if (findStudent.statusCheck === 0 && findStudent.form) {
      const err = {
        status: false,
        message: "Thông tin biên bản đã tồn tại và đang chờ xác nhận!",
      };
      res.status(500).send(err);
      return;
    }

    if (findStudent.statusCheck === 8) {
      await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Sửa báo cáo thành công" });
    }

    if (findStudent.statusCheck === 6) {
      await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Nộp báo cáo thành công" });
    }
  } catch (error) {
    res.status(500).send({
      message: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin biên bản!",
    });
  }
};

export const form = async (req, res) => {
  const { nameCompany, internshipTime, form, taxCode, mssv, email } = req.body;
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
    if (!findStudent.CV) {
      const err = {
        status: false,
        message: "CV phải được duyệt trước khi nộp biên bản!",
      };
      res.status(500).send(err);
      return;
    }

    if (findStudent.statusCheck === 3) {
      const err = {
        message: "CV của bạn trượt không đủ điều kiện nộp báo cáo!",
      };
      res.status(500).send(err);
      return;
    }

    if (findStudent.statusCheck === 0 && findStudent.form) {
      const err = {
        message: "Biên bản của bạn đang được kiểm tra !",
      };
      res.status(500).send(err);
      return;
    }

    // const time = moment(internshipTime).format();
    const update = {
      taxCode: taxCode,
      internshipTime: internshipTime,
      nameCompany: nameCompany,
      form: form,
      report: null,
      statusCheck: 4,
    };
    if (findStudent.statusCheck === 5) {
      const result = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Sửa biên bản thành công" });
    }
    if (findStudent.statusCheck === 2) {
      const result = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: "Nộp biên bản thành công" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng quay lại sau ít phút" });
  }
};
