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

const router = require("express").Router();

router.get(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  getNarrow
);
router.post(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  insertNarrow
);
router.patch(
  "/narrow",
  isAuthenticateUser,
  authorizeRoles([1,2]),
  updateNarrow
);
router.delete("/narrow", deleteNarrow);
module.exports = router;
