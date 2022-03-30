import express from 'express';
import {getUsers, loginGoogle} from "../controllers/AuthController";
import {isAuthenticateUser,authorizeRoles} from '../middlewares/CheckAuth'

const router = express.Router();

router.post('/login-google',loginGoogle)
router.get('/user',getUsers)

module.exports = router;