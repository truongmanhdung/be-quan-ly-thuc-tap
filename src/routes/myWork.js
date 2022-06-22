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
  authorizeRoles([1,2]),
  listReviewer
);
router.get(
  "/reivewForm",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  listReviewForm
);
router.get(
  "/reivewReport",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  reviewReport
);

module.exports = router;
