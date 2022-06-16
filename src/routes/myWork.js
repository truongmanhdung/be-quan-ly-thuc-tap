import express from "express";
import {
  listReviewer,
  listReviewForm,
  reviewReport,
} from "../controllers/reviewer";
import { authorizeRoles, isAuthenticateUser } from "../middlewares/CheckAuth";
const router = express.Router();
router.get(
  "/review",
  isAuthenticateUser,
  authorizeRoles("manager"),
  listReviewer
);
router.get(
  "/reivewForm",
  isAuthenticateUser,
  authorizeRoles("manager"),
  listReviewForm
);
router.get(
  "/reivewReport",
  isAuthenticateUser,
  authorizeRoles("manager"),
  reviewReport
);

module.exports = router;
