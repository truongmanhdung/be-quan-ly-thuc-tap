import express from "express"
import { getListTypeSetTime, handleSetTimeRequest } from "../controllers/adminSetTime";

const router = express.Router()

router.post('/settime',handleSetTimeRequest)
router.get('/settime',getListTypeSetTime)

module.exports = router;