const { reportFormStudent } = require("../controllers/reportFromController");

const router = require("express").Router();

router.patch("/report-form", reportFormStudent);

module.exports = router;
