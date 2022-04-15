import { sendMail } from "./emailController";

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
      (findStudent.numberOfTime === 2 && findStudent.statusCheck === 10) ||
      (findStudent.numberOfTime === 2 && findStudent.statusCheck <= 3)
    ) {
      res.status(500).send({
        message:
          "Tài khoạn của bạn đã vượt quá số lần đăng ký thông tin thực tập",
      });
    }

    if (findStudent.numberOfTime < 2 && findStudent.statusCheck === 10) {
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
      console.log("update", update);
      const content = `
      <div id=":18p" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0."><div id=":18o" class="a3s aiL "><div style="background-color:#eeeeee;padding:15px"><div class="adM">
    </div><div style="margin:auto;background-color:#ffffff;width:500px;padding:10px;border-top:2px solid #e37c41"><div class="adM">
        </div><img src="https://i.imgur.com/q7xM8RP.png" width="120" alt="logo" data-image-whitelisted="" class="CToWUd">
        <p>
            Xin chào <b>${findStudent.name}</b>,<br>
            Bạn vừa <b style="color:green"><span class="il">đăng</span> <span class="il">ký</span> <span class="il">thành</span> <span class="il">công</span></b> dịch vụ <b><span class="il">Đăng</span> <span class="il">ký</span> hỗ trợ thực tập</b> <br>
            Trạng thái hiện tại của dịch vụ là <b style="color:orange">Chờ kiểm tra </b><br>
            Nội dung(nếu có): Lưu ý mỗi sinh viên sẽ giới hạn 2 lần được nộp hỗ trợ tìm nơi thực tập từ phòng quan hệ doanh nghiẹp
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
        subject: "Đăng ký hỗ trợ tìm nơi thực tập thành công",
        text: content,
      };
      sendMail(dataMail);
      //Ho tro
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
