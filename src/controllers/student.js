import Student from "../models/student";
const ObjectId = require('mongodb').ObjectID;

export const listStudent = async (req, res) => {
  const { limit, page } = req.query
  if (page && limit) {
    //getPage
    let perPage = parseInt(page)
    let current = parseInt(limit)
    if (perPage < 1 || perPage == undefined || current == undefined) {
      perPage = 1
      current = 9
    }
    const skipNumber = (perPage - 1) * current
    try {
      await Student.find(req.query).populate('campus_id').populate('campus_id').skip(skipNumber).limit(current).sort({ 'CV': -1 }).exec((err, doc) => {
        if (err) {
          res.status(400).json(err)
        } else {
          Student.find(req.query).countDocuments({}).exec((count_error, count) => {
            if (err) {
              res.json(count_error);
              return
            } else {
              res.status(200).json({
                total: count,
                list: doc
              })
              return
            }
          })
        }

      })
    } catch (error) {
      res.status(400).json(error)
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

export const insertStudent = async (req, res) => {
  try {
    const student = await Student.insertMany(req.body)

    res.json(student)
    return
  } catch (error) {
    res.status(400).json({
      error: "Create Student failed"
    })
    return
  }
}

export const updateReviewerStudent = async (req, res) => {
  const { listIdStudent, email } = req.body
  const listIdStudents = listIdStudent.map(id => ObjectId(id))
  try {
    Student.updateMany({ _id: { $in: listIdStudents } },
          {
            $set: {
              reviewer: email
            }
          },
          { multi: true },

          function(err, records){
            if (err) {
                console.error('ERR', err);
            }
        })
  } catch (error) {
      console.log(error)
  }
}

export const listStudentAssReviewer = async (req, res) => {
    const emailReviewer = req.query
    try {
      const listStudentAssReviewer = await Student.find({reviewer:emailReviewer})
      res.status(200).json(listStudentAssReviewer)
    } catch (error) {
      res.status(400).json(error)
    }
  
};