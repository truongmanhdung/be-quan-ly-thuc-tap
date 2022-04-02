import express from "express"
import { getListCumpus } from "../controllers/cumpus";

const router = express.Router()

router.get('/cumpus',getListCumpus)

module.exports = router;