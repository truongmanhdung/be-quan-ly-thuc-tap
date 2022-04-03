const sendMailController = require('../controllers/emailController');

const router = require('express').Router();


// send mail

router.post("/send-mail", sendMailController.sendMailUser);

module.exports = router;

