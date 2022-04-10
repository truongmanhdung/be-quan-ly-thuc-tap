const { text } = require("body-parser");
const nodemailer = require("nodemailer");

const sendMailController = {
  sendMailUser: async (req, res) => {
    try {
      //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
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
      let content = "";
      content += `
                  <div style="padding: 10px; background-color: #003375">
                      <div style="padding: 10px; background-color: white;">
                          <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
                          <span style="color: black">${req.body.text}</span>
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
          console.log(err);
          req.flash("mess", "Lỗi gửi mail: " + err);
          res.redirect("/");
        } else {
          console.log("Message sent: " + info.response);
          req.flash("mess", "Một email đã được gửi đến tài khoản của bạn"); //Gửi thông báo đến người dùng
          res.redirect("/");
        }
      });
      // res.status(200).json(req.body.mail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = sendMailController;
