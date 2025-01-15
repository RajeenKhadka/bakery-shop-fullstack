import { useState, useEffect } from "react";
import axios from "axios";

export const useCart = (userId) => {
  const [cart, setCart] = useState([]);

  // Function to add items to the cart
  const addToCart = async (cake) => {
    try {
      const existingItem = cart.find((item) => item.cakeId === cake._id);
      if (existingItem) {
        // Show alert if the item already exists in the cart
        alert(`${cake.name} is already in the cart!`);
        return; // Prevent adding the item if it already exists
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

        alert(`${cake.name} added to cart!`); // Show alert when a new item is added
      }
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  // Function to remove an item from the cart
  const removeItem = async (itemId) => {
    try {
      // Call the backend to remove the item
      const response = await axios.delete(
        `http://localhost:5052/api/cart/${userId}/${itemId}`
      );

      // If successful, update the cart state by filtering out the removed item
      setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));

      console.log(response.data.message); // Log success message
    } catch (err) {
      console.error("Error removing item from cart:", err);
    }
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    try {
      console.log("Sending update request for:", userId, itemId, newQuantity);
      const response = await axios.put(
        `http://localhost:5052/api/cart/${userId}/${itemId}`, // Using itemId in the URL
        { quantity: newQuantity } // Payload
      );

      if (response.status === 200) {
        // If successful, update the local cart state
        setCart((prevCart) =>
          prevCart.map((item) =>
            item._id === itemId // Match based on itemId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating item quantity:", err);
      alert("Failed to update item quantity.");
    }
  };

  return { cart, addToCart, removeItem, updateQuantity };
};
