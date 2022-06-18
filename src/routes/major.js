import express from "express";
import {
  createMajor,
  getListMajor,
  removeMajor,
  updateMajor,
} from "../controllers/major";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";

const router = express.Router();

router.get("/major", isAuthenticateUser, getListMajor);
router.get("/major/:id", isAuthenticateUser, getListMajor);
router.post(
  "/major",
  isAuthenticateUser,
  authorizeRoles(1),
  createMajor
);
router.patch(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles(1),
  updateMajor
);
router.delete(
  "/major/:id",
  isAuthenticateUser,
  authorizeRoles(1),
  removeMajor
);

module.exports = router;
