const {
  getSemester,
  insertSemester,
  updateSemester,
  getDefaultSemester,
} = require("../controllers/semesterController");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/CheckAuth");

const router = require("express").Router();

router.get(
  "/smester",
  isAuthenticateUser,
  authorizeRoles("manager"),
  getSemester
);
router.post(
  "/add-mester",
  isAuthenticateUser,
  authorizeRoles("manager"),
  insertSemester
);
router.patch(
  "/update-mester",
  isAuthenticateUser,
  authorizeRoles("manager"),
  updateSemester
);
router.get(
  "/smester/default",
  isAuthenticateUser,
  authorizeRoles("manager"),
  getDefaultSemester
);
module.exports = router;
