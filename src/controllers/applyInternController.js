const Student = require("../models/student");
export const signUpCVForSupport = async (req, res) => {

  try {
    const filter = { mssv: req.body.user_code };
    const findStudent = await Student.findOne(filter);
    if (!findStudent) {
      res.status(404).json("Wrong student");
    }

    if (findStudent) {
      const update = await {
        address: req.body.address,
        dream: req.body.dream,
        email: req.body.email,
        majors: req.body.majors,
        name: req.body.name,
        phoneNumber: req.body.phone,
        CV: req.body.CV,
        statusCheck: req.body.statusCheck
      };
      const user = await Student.findOneAndUpdate({_id: req.params.id}, update,{new : true} );
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
  
}


