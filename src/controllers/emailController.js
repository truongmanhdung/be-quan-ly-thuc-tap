const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "hantvnodemailer@gmail.com",
    clientId:
      "240562429887-mek2d73li2ol168fdduahep87m6rpumv.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04QGsomQkoD5zCgYIARAAGAQSNwF-L9Ir_JVDaMHndu9f2pYwsRqKIU0NTn_xvEgWp7JPXH8sOG0gzHmv4q3m1_OMoQ1l57czHw0",
    accessToken:
      "ya29.a0ARrdaM94VtgdHuDQshgkO6Gu4c3vh8ii-foohgilmevR7IcO222OPkW1NUZ3UynW54vEDSSNNxP9zYHl_bqfnakJcOV7eKC05UrbIOkVXfqX7dihLpoBckND2Kxu3BLAR2MT8ui-r64x420HUv0GTG12GnR9",
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
