import express from "express"
import { handleSetTimeRequest, getTimeRequestForm } from "../controllers/adminSetTime";

const router = express.Router()

router.post('/settime',handleSetTimeRequest)
router.get('/settime/:formcheck', getTimeRequestForm)
module.exports = router;