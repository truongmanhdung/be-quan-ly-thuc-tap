const {
  reportFormStudent,
  reportForm,
} = require("../controllers/reportFromController");

const router = require("express").Router();

router.patch("/report-form", reportFormStudent);
router.patch("/form", reportForm);

module.exports = router;
