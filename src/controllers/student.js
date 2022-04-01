import Student from "../models/student";
export const listStudent = async (req, res) => {
  let page = req.query.page;
  const page_size = 8;
  if (page) {
    const skip = (page - 1) * page_size;
    try {
      await Student.find()
        .skip(skip)
        .limit(page_size)
        .exec((res, err) => {
          if (err) {
            return res.json(err);
          } else {
            Student.countDocuments({}).exec((count_error, count) => {
              if (err) {
                return res.json(count_error);
              } else {
                return res.json({
                  total: count,
                  list: Student,
                });
              }
            });
          }
        });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};
export const updateStudent = async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { id: req.params.id },
    { new: true }
  );
  res.json(student);
};
export const removeStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    res.json(student);
  } catch (error) {
    console.log("Lỗi r");
  }
};
export const readOneStudent = async (req, res) => {
  const student = await Student.findOne({ id: req.params.id }).exec();
  res.json(student);
};
