import express from "express";
import { createManager, getListManager, getManager, removeManager, updateManager } from "../controllers/manager";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";

const router = express.Router();

router.get("/manager", getListManager);
router.get("/manager/:id", isAuthenticateUser, getManager);
router.post(
  "/manager",
  isAuthenticateUser,
  authorizeRoles(2),
  createManager
);
router.patch(
  "/manager/:id",
  isAuthenticateUser,
  authorizeRoles(2),
  updateManager
);
router.delete(
  "/manager/:id",
  isAuthenticateUser,
  authorizeRoles(2),
  removeManager
);

module.exports = router;
