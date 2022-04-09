import express from "express"
import { handleSetTimeRequest } from "../controllers/adminSetTime";

const router = express.Router()

router.post('/settime',handleSetTimeRequest)

module.exports = router;