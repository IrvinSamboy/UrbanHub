import express from 'express';
import { singUp, singIn } from '../controllers/AuthController.js';

const router = express.Router()

router.post('/singup', singUp)
router.post('/singin', singIn)

export default router