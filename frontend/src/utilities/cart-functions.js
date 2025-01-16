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

      // Refresh the page after the item is removed
      window.location.reload(); // Reload the page to reflect the changes

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

  // Function to update the quantity of an item in the cart
  const deleteCart = async () => {
    try {
      console.log(cart);
      console.log(cart.length);
      // Ensure cart and cart.items are defined and check if it's empty
      if (cart.length === 0) {
        console.log(cart);
        // If the cart is empty, delete it automatically without asking
        const response = await axios.delete(
          `http://localhost:5052/api/cart/${userId}`
        );
        if (response.status === 200) {
          setCart([]); // Clear the cart state
          console.log("Cart is empty. Deleted automatically.");
        }
        return; // Exit after deleting the empty cart
      }

      // If the cart is not empty, ask the user for confirmation
      const confirmDelete = window.confirm(
        "Your cart is not empty. Do you want to delete it before logging out?"
      );

      if (!confirmDelete) return; // Exit if the user cancels

      // Proceed to delete the cart if the user confirms
      const response = await axios.delete(
        `http://localhost:5052/api/cart/${userId}`
      );

      if (response.status === 200) {
        setCart([]); // Clear the cart state
        alert("Cart successfully deleted.");
      }
    } catch (err) {
      console.error("Error deleting cart:", err);
      alert("Failed to delete cart.");
    }
  };

  return { cart, addToCart, removeItem, updateQuantity, deleteCart };
};
