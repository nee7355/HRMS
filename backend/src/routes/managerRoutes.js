import e from "express"
import { getLeaveRequest, getManagerController, getMyTeam, getTeamSummary } from "../controllers/managerController.js";
import { authMiddleware } from "../middlewares/authMiddlleware.js";
const router = e.Router();

router.get('/team',authMiddleware, getMyTeam);
router.get('/summary',authMiddleware, getTeamSummary);
router.get('/leave-request', authMiddleware, getLeaveRequest);
router.get('/:departmentId',authMiddleware, getManagerController);

export default router;