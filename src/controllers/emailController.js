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
      "1//04b3wBcx8l7SbCgYIARAAGAQSNwF-L9Ir03EwFUCeFcrEAe0z_zrrTbueCC8ZdM584Kw0DeFBTAXuKhIdVkh7TUkMjt-saFaoCYQ",
    accessToken:
      "ya29.a0ARrdaM9fE9K551DVjB8gIVA-koRN0i4Wnj_Esj2M1rFzFeGkbEDhY-WwAO-pgn-VGHqOEk6JImSrc1e9QbM9w52VmvcIpVaxg6mkaKuqcMx-4aJb9FnhiVOjOqs3MdxiNNNybDUFKyJRaEd-X-2B9kPLrqAq",
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
        res.status(500).send({ message: "Có lỗi" });
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
