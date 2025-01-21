import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import "./cart.css";

function Cart({
  cart,
  userId,
  removeItem,
  updateQuantity,
  fetchCart,
  loading,
}) {
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotal = () => {
    return cart.reduce(
      (acc, item) =>
        item?.cakeId?.price ? acc + item.quantity * item.cakeId.price : acc,
      0
    );
  };

  useEffect(() => {
    if (!userId) return;
    console.log(cart);
    fetchCart();
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [cart]);

  const filteredCart = cart.filter(
    (item) => item?.cakeId && item?.cakeId?.price > 0 && item?.quantity > 0
  );

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {loading ? (
        <p className="cart-loading">Loading your cart...</p>
      ) : filteredCart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {filteredCart.map((item) => (
            <li key={`${item.cakeId._id}-${item._id}`} className="cart-item">
              <div className="cart-item-details">
                <img
                  src={item.cakeId?.imageUrl}
                  alt={item.cakeId?.name}
                  className="cart-item-img"
                />

                <span className="cart-item-name">{item.cakeId?.name}</span>

                <span className="cart-item-quantity">
                  ${item.cakeId?.price} x {item.quantity}
                </span>
              </div>
              <div className="cart-item-buttons">
                <button
                  onClick={() => removeItem(item._id)}
                  className="cart-item-btn remove-btn"
                >
                  Remove
                </button>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="cart-item-btn increase-btn"
                >
                  +
                </button>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  className="cart-item-btn decrease-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        Total: <span>${totalPrice.toFixed(2)}</span>
      </div>
      <div className="proceed-btn-container">
        <Link to="/checkout" state={{ cart: filteredCart, totalPrice }}>
          <button className="proceed-btn">Proceed to checkout</button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
