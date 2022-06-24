import express from "express";
import {
  createCumpus,
  getListCumpus,
  removeCumpus,
  updateCumpus,
} from "../controllers/cumpus";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
import { role } from "../utils/role";

const router = express.Router();

router.get("/cumpus", getListCumpus);
router.post("/cumpus", isAuthenticateUser, authorizeRoles([role.dev]), createCumpus);
router.patch(
  "/cumpus/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  updateCumpus
);
router.delete(
  "/cumpus/:id",
  isAuthenticateUser,
  authorizeRoles([role.dev]),
  removeCumpus
);

module.exports = router;
