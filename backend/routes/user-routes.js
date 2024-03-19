import express from 'express';
import { getAllUser , register , login } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUser)
router.post('/register' , register)
router.post('/login' , login)

export default router;