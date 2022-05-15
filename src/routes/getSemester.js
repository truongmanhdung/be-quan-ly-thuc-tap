const {
  getSemester,
  insertSemester,
  updateSemester,
} = require("../controllers/semesterController");

const router = require("express").Router();

router.get("/smester", getSemester);
router.post("/add-mester", insertSemester);
router.patch("/update-mester", updateSemester);
module.exports = router;
