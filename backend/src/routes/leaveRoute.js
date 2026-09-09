import express from "express";
import { applyLeaveController } from "../controllers/leaveController.js";
import { authMiddleware } from "../middlewares/authMiddlleware.js";

const router = express.Router();

router.post('/', authMiddleware, applyLeaveController);

export default router;