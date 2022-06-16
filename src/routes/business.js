import express from "express";
import {
  insertBusiness,
  listBusiness,
} from "../controllers/businessController";
import { isAuthenticateUser } from "../middlewares/CheckAuth";
const router = express.Router();

router.post("/business", isAuthenticateUser, insertBusiness);
router.get("/business", isAuthenticateUser, listBusiness);

module.exports = router;
