import express from "express";
import cartController from "../controllers/cart.controller.js";
const router = express.Router();

// Get Cart for a User
router.get("/:userId", cartController.getCart);

// Add Item to Cart
router.post("/:userId", cartController.addToCart);

// Update Cart Item Quantity
router.put("/:userId/:itemId", cartController.updateCart);

// Remove Item from Cart
router.delete("/:userId/:itemId", cartController.removeItem);

export default router;
