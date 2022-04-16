import express from "express";
import {
  signUpCVForSupport,
  signUpProactive,
} from "../controllers/applyInternController";
import { isAuthenticateUser } from "../middlewares/CheckAuth";
import { checkRequestTime } from "../middlewares/CheckTimeRequest";

const router = express.Router();

router.patch("/intern/support", isAuthenticateUser, checkRequestTime, signUpCVForSupport);
router.patch("/intern/proactive", isAuthenticateUser, checkRequestTime, signUpProactive);

module.exports = router;
