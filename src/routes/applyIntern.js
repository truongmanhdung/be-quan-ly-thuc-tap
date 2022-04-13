import express from "express";
import {
  signUpCVForSupport,
  signUpProactive,
} from "../controllers/applyInternController";
import { checkRequestTime } from "../middlewares/CheckTimeRequest";

const router = express.Router();

router.patch("/intern/support",checkRequestTime, signUpCVForSupport);
router.patch("/intern/proactive",checkRequestTime, signUpProactive);

module.exports = router;
