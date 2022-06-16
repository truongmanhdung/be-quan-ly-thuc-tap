import express from "express";
import {
  createSpecialization,
  getListSpecialization,
} from "../controllers/specialization";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
const router = express.Router();

router.post(
  "/specialization",
  isAuthenticateUser,
  authorizeRoles("manager"),
  createSpecialization
);
router.get(
  "/specialization",
  isAuthenticateUser,
  authorizeRoles("manager"),
  getListSpecialization
);

module.exports = router;
