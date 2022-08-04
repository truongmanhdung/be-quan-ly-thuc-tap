import express from "express";
import {
  createMajor,
  getListMajor,
  getMajor,
  removeMajor,
  updateMajor,
} from "../controllers/major";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import { role } from "../utils/role";

const router = express.Router();

router.get("/major", getListMajor);
router.get("/major/:id", getMajor);
router.post(
  "/major",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  createMajor
);
router.patch(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  updateMajor
);
router.delete(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  removeMajor
);

module.exports = router;
