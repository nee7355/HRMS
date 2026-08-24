import express from "express";
import { addUserController, userLoginController, usersController, editUserController, deleteUserController } from "../controllers/user.controller.js";

const router = express.Router();

//user crud api
router.get("/", usersController);
router.post("/addEmployee", addUserController);
router.put("/editEmployee/:id", editUserController);
router.delete("/deleteEmployee/:id", deleteUserController);


//user  login api
router.post("/login", userLoginController)

export default router; 