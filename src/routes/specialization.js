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
  authorizeRoles(1),
  createSpecialization
);
router.get(
  "/specialization",
  isAuthenticateUser,
  authorizeRoles(1),
  getListSpecialization
);

module.exports = router;
