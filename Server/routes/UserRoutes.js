import express from 'express';
import {updateUser, singOut, getUserProperties} from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';
import { singUp, singIn, googleAuth } from '../controllers/AuthController.js';

const router = express.Router()

router.post('/singup', singUp)
router.post('/singin', singIn)
router.post('/google', googleAuth)
router.put('/update/:id', verifyToken, updateUser)
router.get('/singout', singOut)
router.get('/properties/:id', verifyToken, getUserProperties)

export default router