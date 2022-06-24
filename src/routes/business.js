import express from "express";
import {
  insertBusiness,
  listBusiness,
} from "../controllers/businessController";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import { role } from "../utils/role";
const router = express.Router();

router.post("/business", isAuthenticateUser, authorizeRoles([role.manager]), insertBusiness);
router.get("/business", isAuthenticateUser, listBusiness);

module.exports = router;
