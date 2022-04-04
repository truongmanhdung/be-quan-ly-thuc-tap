import express from 'express';
import {getManagers, loginGoogle, logout} from "../controllers/AuthController";
import {isAuthenticateUser,authorizeRoles} from '../middlewares/CheckAuth'

const router = express.Router();

router.post('/login-google',loginGoogle)
router.get('/manager',getManagers)
router.get('/logout',logout)

module.exports = router