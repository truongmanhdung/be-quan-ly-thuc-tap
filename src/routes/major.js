import express from "express";
import {
  createMajor,
  getListMajor,
  getMajor,
  removeMajor,
  updateMajor,
} from "../controllers/major";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";

const router = express.Router();

router.get("/major", isAuthenticateUser, getListMajor);
router.get("/major/:id", isAuthenticateUser, getMajor);
router.post(
  "/major",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  createMajor
);
router.patch(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  updateMajor
);
router.delete(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  removeMajor
);

module.exports = router;
