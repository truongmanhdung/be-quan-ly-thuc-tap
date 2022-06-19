import express from "express";
import {
  createCumpus,
  getListCumpus,
  removeCumpus,
  updateCumpus,
} from "../controllers/cumpus";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";

const router = express.Router();

router.get("/cumpus", getListCumpus);
router.post("/cumpus", isAuthenticateUser, authorizeRoles(2), createCumpus);
router.patch(
  "/cumpus/:id",
  isAuthenticateUser,
  authorizeRoles(2),
  updateCumpus
);
router.delete(
  "/cumpus/:id",
  isAuthenticateUser,
  authorizeRoles(2),
  removeCumpus
);

module.exports = router;
