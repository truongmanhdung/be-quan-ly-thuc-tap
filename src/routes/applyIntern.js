import express from "express";
import {
  signUpCVForSupport,
  signUpProactive,
} from "../controllers/applyInternController";

const router = express.Router();

router.patch("/intern/support", signUpCVForSupport);
router.patch("/intern/proactive", signUpProactive);

module.exports = router;
