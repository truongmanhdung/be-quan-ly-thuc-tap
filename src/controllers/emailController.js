const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  // config mail server
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hantvnodemailer@gmail.com", //Tài khoản gmail vừa tạo
    pass: "15062001b", //Mật khẩu tài khoản gmail vừa tạo
  },
  tls: {
    rejectUnauthorized: false,
  },
});
export const sendMailUser = async (req, res) => {
  try {
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    let content = "";
    content += `
                  <div style="padding: 10px; background-color: #003375">
                      <div style="padding: 10px; background-color: white;">
                          <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                          <span style="color: black">Kiểm tra mail</span>
                      </div>
                  </div>
              `;
    let mainOptions = {
      from: "NQH-Test nodemailer",
      to: req.body.mail,
      subject: req.body.subject,
      html: content,
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res
          .status(200)
          .send({ message: "Một email đã được gửi đến tài khoản của bạn" }); //Gửi thông báo đến người dùng
      }
    });
    // res.status(200).json(req.body.mail);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const sendMail = async (data) => {
  try {
    let mainOptions = {
      from: "NQH-Test nodemailer",
      to: data.mail,
      subject: data.subject,
      html: data.content,
    };
    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        res.send({ message: err });
      } else {
        res
          .status(200)
          .send({ message: "Một email đã được gửi đến tài khoản của bạn" }); //Gửi thông báo đến người dùng
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
