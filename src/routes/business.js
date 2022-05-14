import express from "express";
import { insertBusiness } from "../controllers/businessController";
const router = express.Router();

router.post("/business", insertBusiness);

module.exports = router;
