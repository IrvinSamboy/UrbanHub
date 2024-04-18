import express from 'express';
import { singUp, singIn, googleAuth } from '../controllers/AuthController.js';

const router = express.Router()

router.post('/singup', singUp)
router.post('/singin', singIn)
router.post('/google', googleAuth)

export default router