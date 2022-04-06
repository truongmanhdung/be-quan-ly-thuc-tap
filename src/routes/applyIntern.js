import express from "express";
import { signUpCVForSupport } from "../controllers/applyInternController";

const router = express.Router();

router.patch("/intern/support", signUpCVForSupport);

module.exports = router;
