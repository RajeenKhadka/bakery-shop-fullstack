import React, { useState, useEffect } from "react";
import axios from "axios";

function Cart({ userId }) {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  // Utility to validate ObjectId
  const isValidObjectId = (userId) => {
    if (userId === "mock12345") return true;
    return /^[a-fA-F0-9]{24}$/.test(id);
  };

  // Fetch cart data from the backend
  const fetchCart = async () => {
    if (!userId || !isValidObjectId(userId)) {
      console.log(userId);
      console.error("Invalid or missing userId", userId);
      setCart([]);
      setLoading(false);
      return;
    }

    setLoading(true); // Start loading
    try {
      console.log("Fetching cart for userId:", userId); // Log userId here
      const response = await axios.get(
        `http://localhost:5052/api/cart/${userId}`
      );
      if (response.data && response.data.items) {
        setCart(response.data.items);
      } else {
        console.log("Cart is empty or not found");
        setCart([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]); // Handle error by resetting the cart
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Recalculate the total price whenever the cart changes
  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) =>
        item?.cakeId?.price ? acc + item.quantity * item.cakeId.price : acc,
      0
    );
  };

  useEffect(() => {
    fetchCart(); // Fetch the cart when the component mounts or userId changes
  }, [userId]);

  useEffect(() => {
    setTotalPrice(calculateTotal()); // Recalculate total when the cart updates
  }, [cart]);

  const removeItem = async (cakeId) => {};

  const updateQuantity = async (cakeId, newQuantity) => {};

  // Filter out invalid or empty cart items before rendering
  const filteredCart = cart.filter(
    (item) => item?.cakeId && item?.cakeId?.price > 0 && item?.quantity > 0
  );

  return (
    <div>
      <h1>Your Cart</h1>
      {loading ? (
        <p>Loading your cart...</p>
      ) : filteredCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {filteredCart.map((item) => (
            <li key={`${item.cakeId._id}-${item._id}`}>
              {item.cakeId?.name} - ${item.cakeId?.price} x {item.quantity}
              <button onClick={() => removeItem(item.cakeId._id)}>
                Remove
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.cakeId._id, item.quantity + 1)
                }
              >
                +1
              </button>
              <button
                onClick={() =>
                  updateQuantity(item.cakeId._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                -1
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
}

export default Cart;
