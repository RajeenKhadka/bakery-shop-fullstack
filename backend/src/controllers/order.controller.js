import Order from "../models/order.model.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import Cake from "../models/cake.model.js";
import Cart from "../models/cart.model.js";

const createOrder = async (req, res) => {
  console.log("Received Order Data:", req.body);

  const {
    userId, // This is assumed to be an email in your request
    items,
    totalPrice,
    shippingAddress,
    email,
    phone,
    paymentMethod,
  } = req.body;

  // Validate required fields
  if (
    !userId ||
    !items ||
    items.length === 0 ||
    !totalPrice ||
    !shippingAddress ||
    !email ||
    !phone ||
    !paymentMethod
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate and enrich each item in the order
  for (let item of items) {
    if (!item.cakeId || !mongoose.Types.ObjectId.isValid(item.cakeId)) {
      return res.status(400).json({ message: "Invalid cakeId in cart" });
    }
    if (!item.quantity || item.quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity in cart" });
    }

    // Fetch cake details
    const cake = await Cake.findById(item.cakeId);
    if (!cake) {
      return res
        .status(400)
        .json({ message: `Cake not found for cakeId ${item.cakeId}` });
    }
    item.cakeName = cake.name; // Enrich item with cake name
  }

  try {
    // Find the user by email (userId is an email in this case)
    console.log(`Looking for user with email: ${userId}`);
    const user = await User.findOne({ email: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Create a new order
    const newOrder = new Order({
      userId: user._id,
      items,
      totalPrice,
      shippingAddress,
      email,
      phone,
      paymentMethod,
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Clear the cart for the user after successful order creation
    const cart = await Cart.findOne({ userId: user._id });
    if (cart) {
      cart.items = []; // Clear all items in the cart
      await cart.save();
    }

    // Return success response
    res.status(201).json({
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res
      .status(500)
      .json({ message: "Error creating order", error: err.message });
  }
};

export default { createOrder };
