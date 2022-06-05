const {
  getNarrow,
  insertNarrow,
  updateNarrow,
} = require("../controllers/narrowSpecializationController");

const router = require("express").Router();

router.get("/narrows", getNarrow);
router.post("/narrows", insertNarrow);
router.patch("/narrow", updateNarrow);
module.exports = router;
