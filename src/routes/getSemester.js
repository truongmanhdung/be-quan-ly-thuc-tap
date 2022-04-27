const { getSemester, insertSemester } = require('../controllers/semesterController');

const router = require('express').Router();



router.get("/smester", getSemester)
router.post("/smester", insertSemester)
module.exports = router;

