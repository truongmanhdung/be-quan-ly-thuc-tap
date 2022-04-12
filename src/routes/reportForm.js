const { report, form } = require("../controllers/reportFromController");

const router = require("express").Router();

router.patch("/report", report);
router.patch("/form", form);

module.exports = router;
