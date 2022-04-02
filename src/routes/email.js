import express from "express";
import {sendMail} from '../controllers/EmailController'

const router = express.Router();
router.post('/send-email',sendMail)
module.exports = router;