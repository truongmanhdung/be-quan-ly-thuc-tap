import express from "express"
import { getListTypeSetTime, handleSetTimeRequest, getOneTypeSetTime } from "../controllers/adminSetTime";
import { isAuthenticateUser, authorizeRoles } from '../middlewares/CheckAuth'

const router = express.Router()

router.post('/settime', isAuthenticateUser, authorizeRoles('manager'), handleSetTimeRequest)
router.get('/settime', isAuthenticateUser, authorizeRoles('manager'), getListTypeSetTime)
router.get('/settime/:type', isAuthenticateUser, getOneTypeSetTime)

module.exports = router;
