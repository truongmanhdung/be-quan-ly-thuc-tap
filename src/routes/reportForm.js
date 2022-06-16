const { report, form } = require("../controllers/reportFromController");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/CheckAuth");
const { checkRequestTime } = require("../middlewares/CheckTimeRequest");
const router = require("express").Router();

router.patch(
  "/report",
  isAuthenticateUser,
  authorizeRoles("manager"),
  checkRequestTime,
  report
);
router.patch(
  "/form",
  isAuthenticateUser,
  authorizeRoles("manager"),
  checkRequestTime,
  form
);

module.exports = router;
