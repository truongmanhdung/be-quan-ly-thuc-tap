const sendMailController = require("../controllers/emailController");
const { isAuthenticateUser } = require("../middlewares/CheckAuth");

const router = require("express").Router();

// send mail

router.post("/send-mail", isAuthenticateUser, sendMailController.sendMailUser);

module.exports = router;
