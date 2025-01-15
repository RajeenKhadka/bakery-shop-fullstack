import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";

//This corresponds to register on the frontend
//because register means add a new user
router.post("/", userController.create);

router.post("/login", userController.login);

export default router;
