const Student = require("../models/student");
export const signUpCVForSupport = async (req, res) => {
  const {
    address,
    email,
    dream,
    majors,
    name,
    phone,
    CV,
    support,
    unit,
    unitAddress,
    taxCode,
    position,
    numberEnterprise,
    emailEnterprise,
  } = req.body;
  try {
    const ms = req.body.user_code.toLowerCase();

    const findStudent = await Student.findOne({
      mssv: ms,
      email: email,
    });

    const filter = {
      mssv: ms,
      email: email,
    };

    if (!findStudent) {
      res.status(500).send({
        message: "Thông tin của bạn không tồn tại trên hệ thống!",
      });
      return;
    }
    if (findStudent.statusCheck === 0) {
      res.status(500).send({
        message: "Thông tin CV của bạn đã được đăng ký",
      });
      return;
    }

    if (
      (findStudent.numberOfTime === 2 && findStudent.statusCheck === 1) ||
      (findStudent.numberOfTime === 2 && findStudent.statusCheck <= 3)
    ) {
      res.status(500).send({
        message:
          "Tài khoạn của bạn đã vượt quá số lần đăng ký thông tin thực tập",
      });
    }

    const count = findStudent.numberOfTime + 1;
    let isSupport = 0;
    support === 1 ? (isSupport = 0) : (isSupport = 4);
    const update = {
      address: address,
      dream: dream,
      email: email,
      majors: majors,
      name: name,
      phoneNumber: phone,
      CV: CV,
      form: null,
      report: null,
      statusCheck: isSupport,
      support: support,
      numberOfTime: count,
      nameCompany: unit,
      addressCompany: unitAddress,
      taxCode: taxCode,
      position: position,
      phoneNumberCompany: numberEnterprise,
      emailEnterprise: emailEnterprise,
    };

    if (findStudent.statusCheck === 1 && findStudent.support === 0) {
      return res
        .status(500)
        .send({ message: "Thông tin tự đăng ký người dùng không được sửa" });
    }

    if (findStudent.statusCheck === 1 && findStudent.support === 1) {
      //Ho tro
      await Student.findOneAndUpdate(filter, update, {
        new: true,
      });

      res
        .status(200)
        .send({ message: "Sửa thông tin CV thành công!", support: support });
    }

    if (findStudent.numberOfTime < 2 && findStudent.statusCheck === 10) {
      await Student.findOneAndUpdate(filter, update, {
        new: true,
      });

      res
        .status(200)
        .send({ message: "Đăng ký thông tin thành công!", support: support });
    }
  } catch (error) {
    res.status(500).send({
      message: "Đã xảy ra lỗi! Đăng ký lại sau ít phút!",
    });
  }
};
