import express from "express";
import { insertBusiness, listBusiness } from "../controllers/businessController";
const router = express.Router();

router.post("/business", insertBusiness);
router.get("/business", listBusiness)

module.exports = router;
