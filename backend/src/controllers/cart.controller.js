import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Cake from "../models/cake.model.js";

// Get Cart for a User with populated cake data
export const getCart = async (req, res) => {
  const { userId } = req.params;

  // Ensure that the userId is a valid format (optional, for validation)
  if (!userId || userId.trim() === "") {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    // Query the Cart collection using userId and populate the cakeId field
    const cart = await Cart.findOne({ userId }).populate(
      "items.cakeId",
      "name price"
    ); // Populate the cakeId with name and price

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart); // Send back the cart with populated data
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(400).json({ message: "Error fetching cart" });
  }
};

// Add Item to Cart
export const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { cakeId, quantity } = req.body; // Extract cakeId and quantity from the request body

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({
        userId,
        items: [{ cakeId, quantity }],
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.cakeId.toString() === cakeId
    );

    if (existingItemIndex >= 0) {
      // If the item already exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add the item if it doesn't exist in the cart
      cart.items.push({ cakeId, quantity });
    }

    await cart.save();
    res.status(200).json(cart); // Send the updated cart back to the frontend
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(400).json({ message: "Error adding item to cart" });
  }
};

// Update Cart Item Quantity
export const updateCart = async (req, res) => {};

// Remove Item from Cart
export const removeItem = async (req, res) => {};

export default { getCart, addToCart, updateCart, removeItem };
