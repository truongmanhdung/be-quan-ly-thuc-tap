const {
  getNarrow,
  insertNarrow,
  updateNarrow,
  deleteNarrow,
} = require("../controllers/narrowSpecializationController");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/CheckAuth");
const { role } = require("../utils/role");

const router = require("express").Router();

router.get("/narrows",isAuthenticateUser, getNarrow);
router.post(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  insertNarrow
);
router.patch(
  "/narrows/:id",
  isAuthenticateUser,
  authorizeRoles([role.manager]),
  updateNarrow
);
router.delete("/narrow", deleteNarrow);
module.exports = router;
