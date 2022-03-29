import express from 'express';
import {signup,signin, signout, loginGoogle} from "../controllers/AuthController";

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.get("/signout",signout);
router.post('/login-google',loginGoogle)

module.exports = router;