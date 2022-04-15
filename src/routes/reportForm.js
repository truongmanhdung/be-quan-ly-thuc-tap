const { report, form } = require("../controllers/reportFromController");
const { isAuthenticateUser, authorizeRoles } = require("../middlewares/CheckAuth");
const { checkRequestTime } = require("../middlewares/CheckTimeRequest");
const router = require("express").Router();

router.patch("/report", isAuthenticateUser, checkRequestTime, report);
router.patch("/form", isAuthenticateUser, checkRequestTime, form);

module.exports = router;
