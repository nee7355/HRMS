import e from "express"
import { getManagerController, getMyTeam } from "../controllers/managerController.js";
import { authMiddleware } from "../middlewares/authMiddlleware.js";
const router = e.Router();

router.get('/team',authMiddleware, getMyTeam);
router.get('/:departmentId',authMiddleware, getManagerController);

export default router;