import express from "express"
import { getListTypeSetTime, handleSetTimeRequest, getOneTypeSetTime } from "../controllers/adminSetTime";

const router = express.Router()

router.post('/settime',handleSetTimeRequest)
router.get('/settime',getListTypeSetTime)
router.get('/settime/:type', getOneTypeSetTime)

module.exports = router;
