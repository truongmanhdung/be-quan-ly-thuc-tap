import express from "express";
import { signUpCVForSupport } from "../controllers/applyInternController";
import { checkRequestTime } from "../middlewares/CheckTimeRequest";

const router = express.Router();

router.patch("/intern/support", signUpCVForSupport);

module.exports = router;
