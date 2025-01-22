import Cart from "../models/cart.model.js";

//============================================================================//
// Get Cart for a User with populated cake data
const getCart = async (req, res) => {
  const { userId } = req.params;

  // Ensure that the userId is a valid format (optional, for validation)
  if (!userId || userId.trim() === "") {
    return res.status(400).json({ message: "Invalid or missing userId" });
  }

  try {
    // Query the Cart collection using userId and populate the cakeId field
    let cart = await Cart.findOne({ userId }).populate(
      "items.cakeId",
      "name price imageUrl"
    ); // Populate the cakeId with name and price
    console.log(cart);

    // If no cart found, create an empty cart for the user
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    res.status(200).json(cart); // Send back the cart with populated data or an empty cart
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

//============================================================================//
// Add Item to Cart
const addToCart = async (req, res) => {
  const { userId } = req.params;
  const { cakeId, quantity } = req.body; // Extract cakeId and quantity from the request body

  // Validate inputs
  if (!cakeId || !quantity || quantity < 1) {
    return res
      .status(400)
      .json({ message: "Invalid input, quantity must be greater than 0" });
  }

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
    res.status(500).json({ message: "Error adding item to cart" });
  }
};

//============================================================================//
// Update Cart Item Quantity
const updateCart = async (req, res) => {
  const { userId, itemId } = req.params; // Extract userId and itemId from request params
  const { quantity } = req.body; // Extract new quantity from the request body

  // Validate inputs
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    // Find the cart for the given user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const item = cart.items.find((item) => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the item's quantity
    item.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (err) {
    console.error("Error updating cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//============================================================================//
// Remove Item from Cart
const removeItem = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    // Find the cart for the given user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item with the specified itemId
    const updatedItems = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    if (cart.items.length === updatedItems.length) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the cart with the remaining items
    cart.items = updatedItems;
    await cart.save();

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (err) {
    console.error("Error removing item from cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//============================================================================//
// Delete the Entire Cart
const deleteEntireCart = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find and delete the cart for the given userId
    const deletedCart = await Cart.findOneAndDelete({ userId });

    if (!deletedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (err) {
    console.error("Error deleting entire cart:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  getCart,
  addToCart,
  updateCart,
  removeItem,
  deleteEntireCart,
};
