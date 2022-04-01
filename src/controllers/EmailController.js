const mailer = require('../utils/mailer')
export  const sendMail = async  (req,res) => {
    try {
        const { to, subject, body } = req.body
        // Thực hiện gửi email
        // const convertTo = to.map(i=>i.email)
        // console.log(to.map(i=>i.email))
        await mailer.sendMail(to,subject,body)
        res.send('<h3>Your email has been sent successfully.</h3>')
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}