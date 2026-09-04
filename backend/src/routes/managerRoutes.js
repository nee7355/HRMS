import e from "express"
import { getManagerController } from "../controllers/managerController.js";
const router = e.Router();

router.get('/:departmentId', getManagerController)

export default router;