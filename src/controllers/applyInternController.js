const Student = require("../models/student");
export const signUpCVForSupport = async (req, res) => {
  const { address, email, dream, majors, name, phone, CV, support } = req.body;
  try {
    const filter = { mssv: req.body.user_code };
    const findStudent = await Student.findOne(filter);
    if (!findStudent) {
      const message = {
        status: true,
        message: "Mã số sinh viên không đúng. Vui lòng nhập lại",
      };
      res.status(500).send(message);
    }

    if (findStudent.CV) {
      const message = "Sinh viên đã đăng ký CV";
      res.status(500).send(message);
    }

    if (findStudent) {
      const update = {
        address: address,
        dream: dream,
        email: email,
        majors: majors,
        name: name,
        phoneNumber: phone,
        CV: CV,
        statusCheck: 0,
        support: support,
      };
      const user = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
