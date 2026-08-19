import express from "express";
import { addUserController, userLoginController } from "../controllers/user.controller.js";

const router = express.Router();

//user crud api
router.post("/addUser", addUserController);


//user  login api
router.post("/login", userLoginController)

export default router; 