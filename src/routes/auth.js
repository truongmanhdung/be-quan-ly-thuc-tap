import express from 'express';
import {getManagers, loginGoogle} from "../controllers/AuthController";
import {isAuthenticateUser,authorizeRoles} from '../middlewares/CheckAuth'

const router = express.Router();

router.post('/login-google',loginGoogle)
router.get('/user',getManagers)

module.exports = router;