const Student = require("../models/student");
export const signUpCVForSupport = async (req, res) => {
  const { address, email, dream, majors, name, phone, CV, support } = req.body;
  try {
    const filter = { mssv: req.body.user_code, email: email };
    const findStudent = await Student.findOne(filter);
    console.log(findStudent);
    if (!findStudent) {
      res.status(500).send({
        message: "Thông tin sinh viên gửi lên không đúng, vui lòng nhập lại!",
      });
      return;
    }
    if (findStudent.statusCheck === 0) {
      res.status(500).send({
        message: "Thông tin của bạn đã được đăng ký",
      });
      return;
    }

    if (
      (findStudent.numberOfTime === 2 && findStudent.statusCheck === 4) ||
      (findStudent.numberOfTime === 2 && findStudent.statusCheck <= 3)
    ) {
      res.status(500).send({
        message: "Tài khoản của bạn vướt quá số lần cập nhật thông tin đăng ký",
      });
    }

    if (findStudent.numberOfTime < 2 && findStudent.statusCheck === 4) {
      const count = findStudent.numberOfTime + 1;

      const update = {
        address: address,
        dream: dream,
        email: email,
        majors: majors,
        name: name,
        phoneNumber: phone,
        CV: CV,
        statusCheck: 0,
        support: 1,
        numberOfTime: count,
      };
      await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res
        .status(200)
        .send({ message: "Đăng ký thông tin thành công!", support: 1 });
    }
  } catch (error) {
    res.status(500).send({
      message: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin đăng ký!",
    });
  }
};

export const signUpProactive = async (req, res) => {
  const {
    user_code,
    mssv,
    name,
    phone,
    address,
    majors,
    unit,
    unitAddress,
    taxCode,
    position,
    numberEnterprise,
    emailEnterprise,
    email,
  } = req.body;

  try {
    const filter = { mssv: mssv, email: email };
    const findStudent = await Student.findOne(filter);
    console.log(findStudent.statusCheck === 4);

    if (!findStudent) {
      res.status(500).send({
        message: "Thông tin sinh viên gửi lên không đúng, vui lòng nhập lại!",
      });
      return;
    }

    if (findStudent.statusCheck === 0) {
      res.status(500).send({
        message: "Thông tin của bạn đã được đăng ký",
      });
      return;
    }

    if (
      (findStudent.numberOfTime === 2 && findStudent.statusCheck === 4) ||
      (findStudent.numberOfTime === 2 && findStudent.statusCheck <= 3)
    ) {
      res.status(500).send({
        message: "Tài khoản của bạn vướt quá số lần cập nhật thông tin đăng ký",
      });
    }

    if (findStudent.numberOfTime < 2 && findStudent.statusCheck === 4) {
      const count = findStudent.numberOfTime + 1;
      const newData = {
        user_code: user_code,
        name: name,
        phoneNumber: phone,
        address: address,
        majors: majors,
        nameCompany: unit,
        addressCompany: unitAddress,
        taxCode: taxCode,
        position: position,
        numberEnterprise: numberEnterprise,
        emailEnterprise: emailEnterprise,
        support: 0,
        statusCheck: 0,
        numberOfTime: count,
      };
      await Student.findOneAndUpdate(filter, newData, {
        new: true,
      });
      res
        .status(200)
        .send({ message: "Đăng ký thông tin thành công!", support: 0 });
    }
  } catch (error) {
    res.status(500).send({
      message: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin đăng ký!",
    });
  }
};
