import e from "express";
import { addDesignationController, deleteDesignationController, editDesignationController, getDesignationByIdController, getDesignationController } from "../controllers/designationController.js";

const router = e.Router();

// GET /api/designations
router.get('/', getDesignationController);

// GET /api/designations/:id
router.get('/:id', getDesignationByIdController)

// POST /api/designations
router.post('/', addDesignationController);

// PUT /api/designations/:id
router.patch('/:id', editDesignationController);

// DELETE /api/designations/:id
router.delete('/:id', deleteDesignationController);


export default router;