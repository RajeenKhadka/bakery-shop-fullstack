import { useState, useEffect } from "react";
import axios from "axios";

export const useCart = (userId) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = async (cake) => {
    try {
      const existingItem = cart.find((item) => item.cakeId === cake._id);
      if (existingItem) {
        updateQuantity(existingItem.cakeId, existingItem.quantity + 1);
      } else {
        const updatedCart = [
          ...cart,
          { cakeId: cake._id, quantity: 1, name: cake.name, price: cake.price },
        ];
        setCart(updatedCart);

        // Ensure this structure matches what the backend expects
        await axios.post(`http://localhost:5052/api/cart/${userId}`, {
          cakeId: cake._id, // The cakeId being sent here
          quantity: 1, // The quantity being sent here
        });
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };
  // Function to remove an item from the cart
  const removeItem = async (cakeId) => {
    try {
      console.log("RemoveItem");
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (cakeId, quantity) => {
    try {
      console.log("UpdateItem");
    } catch (err) {
      console.error("Error updating cart item quantity:", err);
    }
  };

  return { cart, addToCart, removeItem, updateQuantity };
};
