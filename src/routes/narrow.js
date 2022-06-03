const {
  getNarrow,
  insertNarrow,
  updateNarrow,
} = require("../controllers/narrowSpecializationController");

const router = require("express").Router();

router.get("/narrows", getNarrow);
router.post("/add-narrows", insertNarrow);
router.patch("/update-narrow", updateNarrow);
module.exports = router;
