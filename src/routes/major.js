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
  authorizeRoles([role.dev]),
  createMajor
);
router.patch(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  updateMajor
);
router.delete(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  removeMajor
);

module.exports = router;
