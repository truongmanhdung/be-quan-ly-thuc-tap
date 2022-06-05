const {
  getSemester,
  insertSemester,
  updateSemester,
  getDefaultSemester,
} = require("../controllers/semesterController");

const router = require("express").Router();

router.get("/smester", getSemester);
router.post("/add-mester", insertSemester);
router.patch("/update-mester", updateSemester);
router.get("/smester/default", getDefaultSemester);
module.exports = router;
