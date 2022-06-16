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
  authorizeRoles("managet"),
  getNarrow
);
router.post(
  "/narrows",
  isAuthenticateUser,
  authorizeRoles("managet"),
  insertNarrow
);
router.patch(
  "/narrow",
  isAuthenticateUser,
  authorizeRoles("managet"),
  updateNarrow
);
module.exports = router;
