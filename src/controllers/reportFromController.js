import moment from "moment";
import { sendMail } from "./emailController";

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
    const dateIntern = findStudent.internShipTime === internShipTime;

    if (!nameCompanyD) {
      const err = {
        message: "Tên công ty không khớp với biểu mẫu!",
      };
      res.status(500).send(err);
      return;
    }

    // if (!dateIntern) {
    //   const err = {
    //     message: "Thời gian bắt đầu thực tập không khớp với biểu mẫu!",
    //   };
    //   res.status(500).send(err);
    //   return;
    // }

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

    // if (!findStudent.CV && !findStudent.form) {
    //   const err = {
    //     status: false,
    //     message: "CV và biểu mẫu cần được duyệt trước khi nộp báo cáo!",
    //   };
    //   res.status(500).send(err);
    //   return;
    // }

    const time = moment(internShipTime).format();

    const update = {
      attitudePoint: attitudePoint,
      internshipTime: time,
      nameCompany: nameCompany,
      resultScore: resultScore,
      report: report,
      statusCheck: 0,
    };
    console.log(update);
    // if (findStudent.statusCheck === 2 && findStudent.CV && findStudent.form) {
    const content = `
      <div id=":18p" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":18o" class="a3s aiL "><div style="background-color:#eeeeee;padding:15px"><div class="adM">
    </div><div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41"><div class="adM">
        </div><img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" data-image-whitelisted="" class="CToWUd">
        <p>
            Xin chào <b>${findStudent.name}</b>,<br>
            Bạn vừa <b style="color:green"><span class="il">đăng</span> <span class="il">ký</span> <span class="il">thành</span> <span class="il">công</span></b> thông tin <b><span class="il">Báo</span> <span class="il">cáo</span></b> <br>
            Trạng thái hiện tại của dịch vụ là <b style="color:orange">Chờ kiểm tra </b><br>
            Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 2 lần được nộp đăng tìm nơi thực tập tới phòng QHDN
        </p>
        <hr style="border-top:1px solid">
        <div style="font-style:italic">
            <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span><div class="yj6qo"></div><div class="adL"><br>
        </div></div><div class="adL">
        </div><div class="adL">
                                                                          </div><div class="adL">
          </div></div><div class="adL">
      </div></div><div class="adL">

      </div></div></div>
      `;

    const dataMail = {
      mail: email,
      subject: "Cập nhật báo cáo thực tập thành công",
      text: content,
    };
    sendMail(dataMail);

    await Student.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).send({ message: "Nộp báo cáo thành công" });
    // }
  } catch (error) {
    res.status(500).send({
      message: "Đã xảy ra lỗi! Vui lòng kiểm tra lại thông tin biểu mẫu!",
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

    // if (findStudent.statusCheck < 2 && findStudent.form) {
    //   const err = {
    //     status: false,
    //     message: "Thông tin biên bản đã tồn tại và đang chờ xác nhận!",
    //   };
    //   res.status(500).send(err);
    //   return;
    // }

    const time = moment(internshipTime).format();
    const update = {
      taxCode: taxCode,
      internshipTime: time,
      nameCompany: nameCompany,
      form: form,
      statusCheck: 0,
    };
    if (findStudent.statusCheck === 2 && findStudent.CV) {
      const content = `
      <div id=":18p" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":18o" class="a3s aiL "><div style="background-color:#eeeeee;padding:15px"><div class="adM">
    </div><div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41"><div class="adM">
        </div><img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" data-image-whitelisted="" class="CToWUd">
        <p>
            Xin chào <b>${findStudent.name}</b>,<br>
            Bạn vừa <b style="color:green"><span class="il">nộp</span><span class="il">thành</span> <span class="il">công</span></b> thông tin <b><span class="il">Biểu</span> <span class="il">mẫu</span></b> <br>
            Trạng thái hiện tại của dịch vụ là <b style="color:orange">Chờ kiểm tra </b><br>
            Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 2 lần được nộp đăng tìm nơi thực tập tới phòng QHDN
        </p>
        <hr style="border-top:1px solid">
        <div style="font-style:italic">
            <span>Lưu ý: đây là email tự động vui lòng không phản hồi lại email này, mọi thắc mắc xin liên hệ phòng QHDN qua số điện thoại bên dưới</span><div class="yj6qo"></div><div class="adL"><br>
        </div></div><div class="adL">
        </div><div class="adL">
                                                                          </div><div class="adL">
          </div></div><div class="adL">
      </div></div><div class="adL">

      </div></div></div>
      `;

      const dataMail = {
        mail: email,
        subject: "Nộp biểu mẫu thực tập thành công",
        text: content,
      };
      sendMail(dataMail);

      const result = await Student.findOneAndUpdate(filter, update, {
        new: true,
      });
      console.log("result", result);
      res.status(200).send({ message: "Nộp báo cáo thành công" });
    } else {
      res.status(500).send({
        message: "Trạng thái CV của bạn không đủ điều kiện nộp biểu mẫu!",
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Có lỗi xảy ra! Vui lòng quay lại sau ít phút" });
  }
};
