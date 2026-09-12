import express from "express";
import { applyLeaveController, getLeaveListController, getLeaveTypeController } from "../controllers/leaveController.js";
import { authMiddleware } from "../middlewares/authMiddlleware.js";

const router = express.Router();

router.post('/', authMiddleware, applyLeaveController);
router.get('/', authMiddleware, getLeaveListController);
router.get('/leaveType', authMiddleware, getLeaveTypeController);

export default router;