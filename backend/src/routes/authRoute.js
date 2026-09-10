import express  from 'express';
import { getCurrentUser, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddlleware.js';
import { logOutController } from '../controllers/employeeController.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile)
router.get('/auth', authMiddleware, getCurrentUser);
router.post('/logout', authMiddleware, logOutController);

export default router;