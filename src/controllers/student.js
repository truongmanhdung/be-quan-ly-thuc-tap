import Student from "../models/student";
import { sendMail } from "./emailController";
const ObjectId = require("mongodb").ObjectID;

//listStudent
export const listStudent = async (req, res) => {
  const { limit, page } = req.query;
  try {
    if (page && limit) {
      //getPage
      let perPage = parseInt(page);
      let current = parseInt(limit);
      if (perPage < 1 || perPage == undefined || current == undefined) {
        perPage = 1;
        current = 9;
      }
      const skipNumber = (perPage - 1) * current;
      try {
        await Student.find(req.query)
          .populate("campus_id")
          .populate("smester_id")
          .populate("business")
          .skip(skipNumber)
          .limit(current)
          .sort({ statusCheck: 1 })
          .exec((err, doc) => {
            if (err) {
              res.status(400).json(err);
            } else {
              Student.find(req.query)
                .countDocuments({})
                .exec((count_error, count) => {
                  if (err) {
                    res.json(count_error);
                    return;
                  } else {
                    res.status(200).json({
                      total: count,
                      list: doc,
                    });
                    return;
                  }
                });
            }
          });
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      const listStudent = await Student.find({})
        .populate("campus_id")
        .populate("smester_id")
        .populate("business");
      res.status(200).json({
        total: listStudent.length,
        list: listStudent,
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//updateStudent
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },
      { new: true }
    );
    return res.status(200).json(student);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//removeStudent
export const removeStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    res.json(student);
  } catch (error) {
    res.json("lỗi");
  }
};

//readOneStudent
export const readOneStudent = async (req, res) => {
  const student = await Student.findOne({ mssv: req.params.id })
    .populate("campus_id")
    .populate("smester_id")
    .populate("business")
    .exec();
  res.json(student);
};

export const readStudentById = async (req, res) => {
  const student = await Student.findOne({ _id: req.params.id })
    .populate("campus_id")
    .populate("smester_id")
    .populate("business")
    .exec();
  res.json(student);
};

//insertStudent
export const insertStudent = async (req, res) => {
  const { data, smester_id } = req.body;
  try {
    const checkStudent = await Student.find({}).limit(3);

    if (checkStudent.length > 0) {
      const listMSSV = await Student.find({ smester_id });
      if (listMSSV.length === 0) {
        await Student.insertMany(data);
      } else {
        const listMS = [];
        listMSSV.forEach((item) => {
          listMS.push(item.mssv);
        });
        const listNew = [];
        await data.forEach((item) => {
          listNew.push(item.mssv);
        });

        await Student.updateMany(
          { smester_id },
          {
            $set: {
              checkUpdate: false,
              checkMulti: false,
            },
          },
          { multi: true }
        );

        await Student.updateMany(
          { $and: [{ mssv: { $in: listNew } }, { smester_id }] },
          {
            $set: {
              checkUpdate: true,
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await Student.updateMany(
          { $and: [{ checkUpdate: false }, { smester_id }] },
          {
            $set: {
              statusCheck: 3,
              checkUpdate: true,
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await Student.insertMany(data);

        await Student.updateMany(
          { $and: [{ mssv: { $nin: listMS } }, { smester_id }] },
          {
            $set: {
              checkMulti: true,
            },
          },
          { multi: true }
        );

        await Student.deleteMany({
          $and: [{ checkMulti: false }, { smester_id }],
        });
      }

      await Student.find({ smester_id })
        .populate("campus_id")
        .populate("smester_id")
        .populate("business")
        .limit(20)
        .sort({ statusCheck: 1 })
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            Student.find({ smester_id })
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    } else {
      await Student.insertMany(req.body.data);
      await Student.find({ smester_id })
        .populate("campus_id")
        .populate("smester_id")
        .populate("business")
        .limit(20)
        .sort({ statusCheck: 1 })
        .exec((err, doc) => {
          if (err) {
            res.status(400).json(err);
          } else {
            Student.find({ smester_id })
              .countDocuments({})
              .exec((count_error, count) => {
                if (err) {
                  res.json(count_error);
                  return;
                } else {
                  res.status(200).json({
                    total: count,
                    list: doc,
                  });
                  return;
                }
              });
          }
        });
    }
  } catch (error) {
    res.status(400).json({
      error: "Create Student failed",
    });
    return;
  }
};

//updateReviewerStudent
export const updateReviewerStudent = async (req, res) => {
  const { listIdStudent, email } = req.body;
  try {
    const data = await Student.updateMany(
      { _id: { $in: listIdStudent } },
      {
        $set: {
          reviewer: email,
        },
      },
      { multi: true }
    );
    res.status(200).json({ listIdStudent, email });
  } catch (error) {
    res.json("Lỗi");
  }
};

//updateStatusStudent
export const updateStatusStudent = async (req, res) => {
  const { listIdStudent, status, listEmailStudent, textNote } = req.body;
  const dataEmail = {};
  const listIdStudents = await listIdStudent.map((id) => ObjectId(id));
  const newArr = [];
  if (listEmailStudent) {
    listEmailStudent.forEach((value) => {
      newArr.push(value.email);
    });
  }

  dataEmail.mail = newArr;

  try {
    const data = await Student.updateMany(
      {
        _id: { $in: listIdStudents },
      },
      {
        $set: {
          statusCheck: status,
          note: textNote,
        },
      },
      { multi: true, new: true }
    );
    const listStudentChangeStatus = await Student.find({
      _id: { $in: listIdStudent },
      statusCheck: status,
      note: textNote,
    });
    if (status === 1) {
      console.log("Gửi  ail sửa CV");
      dataEmail.subject = "Thông báo sửa CV thực tập doanh nghiệp";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
        Phòng QHDN yêu cầu bạn sửa lại thông tin <b style="color:green"><span><span class="il">CV</span></span> <span></span></b><br> <br>
        Lý do SV phải sửa CV: ${textNote} <br>
        Trạng thái hiện tại của dịch vụ là <b style="color:orange">Sửa CV </b><br>
        <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;sửa CV</p><br>
        Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 3 lần được hỗ trợ tìm nơi thực tập từ phòng quan hệ doanh nghiệp
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 2) {
      dataEmail.subject = "Thông báo nhận CV sinh viên thành công";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào sinh viên,<br>
          CV của bạn đã được phòng QHDN <b><span>Xác</span> <span>Nhận</span></b>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Nhận CV </b><br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;xem trạng thái CV</p>
          Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 3 lần được hỗ trợ tìm nơi thực tập từ phòng quan hệ doanh nghiệp
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 3) {
      dataEmail.subject = "Thông báo sinh viên trượt thực tập doanh nghiệp";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào Sinh viên,<br>
          Bạn đã trượt thực tập. Phòng QHDN <b><span>Xác</span> <span>Nhận</span></b> <br> <br>
          Lý do SV trượt: ${textNote}<br>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Trượt thực tập </b><br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng k&yacute; thực tập lại v&agrave;o kỳ sau tr&ecirc;n hệ thống <a href="https://ap.poly.edu.vn/">ap.poly.edu.vn</a></p><br>
          Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 3 lần được hỗ trợ tìm nơi thực tập từ phòng quan hệ doanh nghiệp
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 5) {
      dataEmail.subject = "Thông báo sửa biên bản thực tập doanh nghiệp";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào Sinh viên,<br>
          Phòng QHDN yêu cầu bạn sửa lại thông tin <b style="color:green"><span><span class="il">Biên</span></span> <span><span class="il">bản</span></span></b><br> <br>
          Lý do SV phải sửa báo cáo: ${textNote}<br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;sửa biên bản</p><br>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Sửa biên bản </b><br>
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 6) {
      dataEmail.subject = "Thông báo nhận biên bản sinh viên thành công";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào Sinh viên,<br>
          Biên bản của bạn đã được phòng QHDN <b><span>Xác</span> <span>Nhận</span></b><br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;xem trạng thái báo cáo</p><br>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Đang thực tập </b><br>
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 8) {
      dataEmail.subject =
        "Thông báo sinh viên sửa báo cáo thực tập doanh nghiệp";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào Sinh viên,<br>
          Phòng QHDN yêu cầu bạn sửa lại thông tin <b style="color:green"><span><span class="il">Báo</span></span> <span><span class="il">cáo</span></span></b><br> <br>
          Lý do SV phải sửa báo cáo: ${textNote}<br>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Sửa báo cáo </b><br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;sửa báo cáo</p><br>
          Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 3 lần được hỗ trợ tìm nơi thực tập từ phòng quan hệ doanh nghiệp
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    } else if (status === 9) {
      dataEmail.subject =
        "Thông báo Hoàn thành thông tin thực tập sinh viên thành công";
      dataEmail.content = `
      <div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41">
      <div class="adM">
      </div>
      <img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" class="CToWUd">
      <p>
          Xin chào Sinh viên,<br>
          Bạn đã hoành thành thông tin thực tập. Phòng QHDN <b><span>Xác</span> <span>Nhận</span></b> <br> <br>
          Trạng thái hiện tại của dịch vụ là <b style="color:orange">Hoàn thành báo cáo thực tập </b><br>
          Điểm của bạn sẽ được phòng QHDN cập nhật sau 1-2 ngày trên hệ thống  <a href="https://ap.poly.edu.vn/">ap.poly.edu.vn</a> <br>
          <p>Sinh vi&ecirc;n vui l&ograve;ng đăng nhập v&agrave;o trang web <a href="http://apartment-client.xyz">apartment-system</a>&nbsp;xem trạng thái báo cáo</p>
      </p>
      <hr style="border-top:1px solid">
      <div style="font-style:italic">
          <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span>
          <div class="yj6qo"></div>
          <div class="adL"></div>
          <div class="adL"><br>
          </div>
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      <div class="adL">
      </div>
      </div>
      `;
      sendMail(dataEmail);
    }
    return res.json({ listStudentChangeStatus, status });
  } catch (error) {
    res.json("Lỗi");
  }
};

//listStudentAssReviewer
// export const listStudentAssReviewer = async (req, res) => {
//   const { emailReviewer } = req.query;
//   try {
//     const listStudentAssReviewer = await Student.find({
//       reviewer: emailReviewer,
//     });
//     res.status(200).json(listStudentAssReviewer);
//   } catch (error) {
//     res.status(400).json(error);
//   }
// };

//listStudentReviewForm
export const listStudentReviewForm = async (req, res) => {
  try {
    const listStudentReviewForm = await Student.find({
      CV: { $ne: null },
      statusCheck: 2,
    })
      .populate("smester_id")
      .populate("business");
    res.status(200).json(listStudentReviewForm);
  } catch (error) {
    res.status(400).json(error);
  }
};

//listStudentReviewCV
export const listStudentReviewCV = async (req, res) => {
  try {
    const listStudentReviewCV = await Student.find({
      CV: { $ne: null },
      form: null,
      report: null,
      statusCheck: { $in: [0, 1] },
    })
      .populate("smester_id")
      .populate("business");
    res.status(200).json(listStudentReviewCV);
  } catch (error) {
    res.status(400).json(error);
  }
};
