import express from "express"
import { addDepartmentController, deleteDepartmentController, getDepartmentByIdController, getDepartmentController, updateDepartmentController } from "../controllers/departmentController.js";
const router = express.Router();

// GET    /api/departments
router.get('/', getDepartmentController);

// GET    /api/departments/:id
router.get('/:id', getDepartmentByIdController)

// POST   /api/departments
router.post('/', addDepartmentController)

// PUT    /api/departments/:id
router.put('/:id', updateDepartmentController)

// DELETE /api/departments/:id

router.delete('/:id', deleteDepartmentController);

export default  router;