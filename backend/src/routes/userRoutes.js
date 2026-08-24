import express from "express";
import { employeeController, userLoginController, addEmployeeController, editEmployeeController, deleteEmployeeController } from "../controllers/employeeController.js";

const router = express.Router();

//user crud api
router.get("/", employeeController);
router.post("/addEmployee", addEmployeeController);
router.put("/editEmployee/:id", editEmployeeController);
router.delete("/deleteEmployee/:id", deleteEmployeeController);


//user  login api
router.post("/login", userLoginController)

// POST   /api/auth/forgot-password

// POST   /api/auth/reset-password

// PATCH  /api/auth/change-password

// POST   /api/auth/logout

export default router; 