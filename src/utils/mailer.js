const nodeMailer = require ('nodemailer')
const adminEmail = 'tuantqph10582@fpt.edu.vn'
const adminPassword = 'trieuvyvy0412'
const mailHost = 'smtp.gmail.com'
const mailPort = 587
const sendMail = (to, subject, text) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, // nếu các bạn dùng port 465 (smtps) thì để true, còn lại hãy để false cho tất cả các port khác
        auth: {
            user: adminEmail,
            pass: adminPassword
        },

    })
    const options = {
        from: adminEmail, // địa chỉ admin email bạn dùng để gửi
        to: to, // địa chỉ gửi đến
        subject: subject, // Tiêu đề của mail
        text: text // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
    }
    return transporter.sendMail(options)
}
module.exports = {
    sendMail: sendMail
}
