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
  authorizeRoles(1),
  listReviewer
);
router.get(
  "/reivewForm",
  isAuthenticateUser,
  authorizeRoles(1),
  listReviewForm
);
router.get(
  "/reivewReport",
  isAuthenticateUser,
  authorizeRoles(1),
  reviewReport
);

module.exports = router;
