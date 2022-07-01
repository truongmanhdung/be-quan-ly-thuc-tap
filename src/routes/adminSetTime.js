import express from "express";
import {
  getListTypeSetTime,
  handleSetTimeRequest,
  getOneTypeSetTime,
} from "../controllers/adminSetTime";
import { isAuthenticateUser, authorizeRoles } from "../middlewares/CheckAuth";
import { role } from "../utils/role";

const router = express.Router();

router.post(
  "/settime",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  handleSetTimeRequest
);
router.get(
  "/settime",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  getListTypeSetTime
);
router.get("/settime/find-one", isAuthenticateUser, getOneTypeSetTime);

module.exports = router;
