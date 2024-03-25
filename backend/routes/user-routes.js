import express from 'express';
import { getAllUser , register , login , verifyUser , logout } from '../controllers/user-controller.js';

const router = express.Router();

router.get('/', getAllUser)
router.post('/register' , register)
router.post('/login' , login)
router.get('/verifyUser' , verifyUser)
router.get('/logout', logout);

export default router;