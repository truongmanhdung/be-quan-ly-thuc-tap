const {
  getNarrow,
  insertNarrow,
  updateNarrow,
} = require("../controllers/narrowSpecializationController");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../middlewares/CheckAuth");

const router = require("express").Router();

router.get(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles(1),
  getNarrow
);
router.post(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles(1),
  insertNarrow
);
router.patch(
  "/narrow",
  isAuthenticateUser,
  authorizeRoles(1),
  updateNarrow
);
module.exports = router;
