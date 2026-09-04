import express  from 'express';
import { getCurrentUser, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddlleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile)
router.get('/auth', authMiddleware, getCurrentUser);

export default router;