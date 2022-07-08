const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.USER_EMAIL,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFESH_TOKEN,
    accessToken: process.env.MAIL_ACCESS_TOKEN,
  },
});

export const sendMailUser = async (req, res) => {
  try {
    //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    let mainOptions = {
      from: "NQH-Test nodemailer",
      to: req.body.mail,
      subject: req.body.subject,
      html: req.content,
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

export const sendMail = async (req, res) => {
  console.log("req.body: ", req);
  try {
    let mainOptions = {
      from: '"Phòng QHDN" <foo@example.com>',
      to: req.mail,
      subject: req.subject,
      html: req.content,
    };
    transporter.sendMail(mainOptions, function (error, succes) {
      if (error) {
        console.log("Wrong", error);
        return res
          .status(500)
          .send({ message: "Có lỗi xảy ra, không gửi được email" });
      } else {
        console.log("Success", succes);
        return res.status(200).send({ message: "Gửi email thành công" });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
