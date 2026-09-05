import e from "express";
import { checkInController, checkOutController, getTodayAttendanceController } from "../controllers/attendanceController.js";
import { authMiddleware } from "../middlewares/authMiddlleware.js";

const router = e.Router();

router.post('/check-in', authMiddleware, checkInController);
router.post('/check-out', authMiddleware, checkOutController);
router.get('/today-atendance', authMiddleware, getTodayAttendanceController);

export default router;