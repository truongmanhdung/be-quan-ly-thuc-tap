const Student = require("../models/student");
export const signUpCVForSupport = async (req, res) => {
  const { address, email, dream, majors, name, phone, CV,support } = req.body;
  try {
    const filter = { mssv: req.body.user_code };
    const findStudent = await Student.findOne(filter);
    if (!findStudent) {
      const err = {
        status: false,
        message: "Mã số sinh viên của bạn không đúng",
      };
      res.status(404).send(err);
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
        support: support
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
