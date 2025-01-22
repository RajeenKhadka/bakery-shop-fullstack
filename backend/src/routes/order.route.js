import express from "express";
import orderController from "../controllers/order.controller.js"; // Assuming your controller is stored in the `controllers` folder

const router = express.Router();

// Route for creating an order
router.post("/create", orderController.createOrder);

export default router;
