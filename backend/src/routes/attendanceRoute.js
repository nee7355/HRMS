import e from "express";
import { checkInController, checkOutController } from "../controllers/attendanceController";
import { authMiddleware } from "../middlewares/authMiddlleware";

const router = e.Router();

router.post('/check-in', authMiddleware, checkInController);
router.post('/check-out', authMiddleware, checkOutController);

export default router;