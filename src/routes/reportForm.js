const { report, form } = require("../controllers/reportFromController");
const { checkRequestTime } = require("../middlewares/CheckTimeRequest");
const router = require("express").Router();

router.patch("/report",checkRequestTime, report);
router.patch("/form",checkRequestTime, form);

module.exports = router;
